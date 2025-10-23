from django.test import TestCase
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core import mail
from django.shortcuts import resolve_url
from django.test import override_settings
from django.contrib.messages import get_messages

from .models import Topic


class IndexViewTests(TestCase):
    def test_index_page_loads(self):
        response = self.client.get(reverse('learning_logs:index'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'learning_logs/index.html')


@override_settings(
    EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
    DEFAULT_FROM_EMAIL='no-reply@example.com',
)
class ContactFormTests(TestCase):
    def test_contact_submit_rejects_missing_fields(self):
        response = self.client.post(reverse('learning_logs:contact_submit'), {
            'name': 'Tester',
            # email omitted to trigger validation
            'message': 'Hello',
        })
        self.assertRedirects(response, reverse('learning_logs:index'))
        messages = list(get_messages(response.wsgi_request))
        self.assertTrue(any('обязательные поля' in str(msg) for msg in messages))
        self.assertEqual(len(mail.outbox), 0)

    def test_contact_submit_sends_email(self):
        payload = {
            'name': 'Tester',
            'email': 'tester@example.com',
            'phone': '+7 900 123-45-67',
            'message': 'Это пробное сообщение.',
        }
        response = self.client.post(reverse('learning_logs:contact_submit'), payload, follow=True)
        self.assertRedirects(response, reverse('learning_logs:index'))
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('Tester', mail.outbox[0].subject)
        messages = list(get_messages(response.wsgi_request))
        self.assertTrue(any('сообщение отправлено' in str(msg).lower() for msg in messages))


class TopicsViewTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.owner = User.objects.create_user(username='owner', password='test-pass')
        self.other = User.objects.create_user(username='other', password='test-pass')
        Topic.objects.create(text='Owner topic', owner=self.owner)
        Topic.objects.create(text='Other topic', owner=self.other)

    def test_topics_redirects_anonymous_user(self):
        response = self.client.get(reverse('learning_logs:topics'))
        login_url = resolve_url(settings.LOGIN_URL)
        self.assertEqual(response.status_code, 302)
        self.assertIn(login_url, response.url)

    def test_topics_lists_only_current_user_topics(self):
        self.client.login(username='owner', password='test-pass')
        response = self.client.get(reverse('learning_logs:topics'))
        self.assertEqual(response.status_code, 200)
        topics = response.context['topics']
        self.assertEqual(len(topics), 1)
        self.assertEqual(topics[0].text, 'Owner topic')
