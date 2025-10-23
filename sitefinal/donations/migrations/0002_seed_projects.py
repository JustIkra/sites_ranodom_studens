from django.db import migrations


PROJECTS = [
    {"slug": "svo-family", "title": "«МЫ СВОИ»", "goal": 1845000},
    {"slug": "easy-school", "title": "«ЛЕГКАЯ ШКОЛА»", "goal": 615000},
    {"slug": "child-world", "title": "«ДЕТСКИЙ МИР»", "goal": 1230000},
    {"slug": "sober-life", "title": "«ТРЕЗВАЯ СТРАНА»", "goal": 1400000},
    {"slug": "free-space", "title": "«ДОСТУПНАЯ СРЕДА»", "goal": 480000},
    {"slug": "new-life", "title": "«НОВАЯ ЖИЗНЬ»", "goal": 840000},
    {"slug": "future-orgs", "title": "«ОРГАНИЗАЦИИ БУДУЩЕГО»", "goal": 480000},
    {"slug": "lectures", "title": "«ПСИХ-и на выезде»", "goal": 375000},
]


def seed_projects(apps, schema_editor):
    Project = apps.get_model('donations', 'Project')
    for p in PROJECTS:
        Project.objects.get_or_create(slug=p['slug'], defaults={
            'title': p['title'],
            'goal': p['goal'],
            'collected': 0,
        })


def unseed_projects(apps, schema_editor):
    Project = apps.get_model('donations', 'Project')
    for p in PROJECTS:
        Project.objects.filter(slug=p['slug']).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('donations', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_projects, unseed_projects),
    ]







