from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.core.cache import cache
from .models import Topic, Entry
from .forms import TopicForm, EntryForm
import time

def index(request):
    """Домашняя страница Learning Log"""
    return render(request, 'learning_logs/index.html')

def check_rate_limit(ip_address):
    """
    Проверяет лимит отправки писем для IP-адреса.
    Разрешает максимум 3 письма в час.
    """
    cache_key = f"contact_form_{ip_address}"
    current_time = time.time()
    
    # Получаем список времен отправки писем
    sent_times = cache.get(cache_key, [])
    
    # Удаляем записи старше часа
    sent_times = [sent_time for sent_time in sent_times if current_time - sent_time < 3600]
    
    # Проверяем лимит
    if len(sent_times) >= 3:
        return False, 3600 - (current_time - min(sent_times))
    
    # Добавляем текущее время
    sent_times.append(current_time)
    cache.set(cache_key, sent_times, 3600)  # Кешируем на час
    
    return True, 0

def contact_submit(request):
    """Обработка формы контактов и отправка письма."""
    if request.method != 'POST':
        return redirect('learning_logs:index')

    # Получаем IP-адрес пользователя
    ip_address = request.META.get('REMOTE_ADDR', 'unknown')
    
    # Проверяем лимит отправки писем
    can_send, wait_time = check_rate_limit(ip_address)
    if not can_send:
        wait_minutes = int(wait_time / 60)
        messages.error(request, f'Слишком много сообщений. Попробуйте снова через {wait_minutes} минут.')
        return redirect('learning_logs:index')

    name = request.POST.get('name', '').strip()
    email = request.POST.get('email', '').strip()
    phone = request.POST.get('phone', '').strip()
    message_text = request.POST.get('message', '').strip()

    if not name or not email or not message_text:
        messages.error(request, 'Пожалуйста, заполните обязательные поля: имя, email и сообщение.')
        return redirect('learning_logs:index')

    # Дополнительная проверка на спам (простые фильтры)
    spam_keywords = ['viagra', 'casino', 'loan', 'bitcoin', 'crypto', 'investment', 'profit']
    message_lower = message_text.lower()
    if any(keyword in message_lower for keyword in spam_keywords):
        messages.error(request, 'Сообщение содержит недопустимый контент.')
        return redirect('learning_logs:index')

    subject = f'Новое сообщение с сайта от {name}'
    to_email = 'apachi061@mail.ru'
    body_lines = [
        f'Имя: {name}',
        f'Email: {email}',
        f'Телефон: {phone}',
        f'IP: {ip_address}',
        '',
        'Сообщение:',
        message_text,
    ]
    body = '\n'.join(body_lines)

    try:
        send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [to_email], fail_silently=False)
        messages.success(request, 'Ваше сообщение отправлено! Я свяжусь с вами в ближайшее время.')
    except Exception:
        messages.error(request, 'Не удалось отправить сообщение. Попробуйте позже или свяжитесь напрямую по email.')

    return redirect('learning_logs:index')

@login_required # Декоратор: только авторизованные пользователи
def topics(request):
    """Выводит список тем."""
    # Показываем только темы текущего пользователя
    topics = Topic.objects.filter(owner=request.user).order_by('date_added')
    context = {'topics': topics}
    return render(request, 'learning_logs/topics.html', context)

@login_required
def topic(request, topic_id):
    """Выводит одну тему и все ее записи."""
    topic = get_object_or_404(Topic, id=topic_id)
    # Проверяем, что пользователь является владельцем темы
    if topic.owner != request.user:
        raise Http404
    entries = topic.entry_set.order_by('-date_added')
    context = {'topic': topic, 'entries': entries}
    return render(request, 'learning_logs/topic.html', context)

@login_required
def new_topic(request):
    """Добавляет новую тему."""
    if request.method != 'POST':
        # Данные не отправлялись; создается пустая форма.
        form = TopicForm()
    else:
        # Отправлены данные POST; обработать данные.
        form = TopicForm(data=request.POST)
        if form.is_valid():
            new_topic = form.save(commit=False)
            new_topic.owner = request.user  # Привязываем тему к текущему пользователю
            new_topic.save()
            return redirect('learning_logs:topics')
    
    # Вывести пустую или недействительную форму.
    context = {'form': form}
    return render(request, 'learning_logs/new_topic.html', context)

@login_required
def new_entry(request, topic_id):
    """Добавляет новую запись по конкретной теме."""
    topic = get_object_or_404(Topic, id=topic_id)
    
    # Проверяем, что пользователь является владельцем темы
    if topic.owner != request.user:
        raise Http404
        
    if request.method != 'POST':
        # Данные не отправлялись; создается пустая форма.
        form = EntryForm()
    else:
        # Отправлены данные POST; обработать данные.
        form = EntryForm(data=request.POST)
        if form.is_valid():
            new_entry = form.save(commit=False)
            new_entry.topic = topic  # Привязываем запись к теме
            new_entry.save()
            return redirect('learning_logs:topic', topic_id=topic_id)
    
    # Вывести пустую или недействительную форму.
    context = {'topic': topic, 'form': form}
    return render(request, 'learning_logs/new_entry.html', context)

@login_required
def edit_entry(request, entry_id):
    """Редактирует существующую запись."""
    entry = get_object_or_404(Entry, id=entry_id)
    topic = entry.topic
    
    # Проверяем, что пользователь является владельцем темы
    if topic.owner != request.user:
        raise Http404
        
    if request.method != 'POST':
        # Исходный запрос; форма заполняется данными текущей записи.
        form = EntryForm(instance=entry)
    else:
        # Отправлены данные POST; обработать данные.
        form = EntryForm(instance=entry, data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('learning_logs:topic', topic_id=topic.id)
    
    context = {'entry': entry, 'topic': topic, 'form': form}
    return render(request, 'learning_logs/edit_entry.html', context)