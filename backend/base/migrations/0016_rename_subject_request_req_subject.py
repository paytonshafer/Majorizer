# Generated by Django 4.1.6 on 2023-04-03 15:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_schedule_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='request',
            old_name='subject',
            new_name='req_subject',
        ),
    ]
