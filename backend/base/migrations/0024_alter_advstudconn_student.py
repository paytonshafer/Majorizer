# Generated by Django 4.1.6 on 2023-04-08 18:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_remove_schedule_semester10_remove_schedule_semester9_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advstudconn',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.student'),
        ),
    ]
