from django import forms
from .models import Topic, Entry

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['text']
        labels = {'text': ''}  # Убираем текстовую метку

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ['text']
        labels = {'text': ''}  # Убираем текстовую метку
        widgets = {
            'text': forms.Textarea(attrs={'cols': 80})  # Делаем поле побольше
        }