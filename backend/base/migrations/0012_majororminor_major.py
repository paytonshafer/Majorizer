# Generated by Django 4.1.6 on 2023-03-21 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_schedule_major2_alter_schedule_minor1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='majororminor',
            name='major',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
