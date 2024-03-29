# Generated by Django 4.1.6 on 2023-03-19 14:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_schedule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='major2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='SchedMajor2', to='base.majororminor'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='minor1',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='SchedMinor1', to='base.majororminor'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='minor2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='SchedMinor2', to='base.majororminor'),
        ),
        migrations.AlterField(
            model_name='student',
            name='major2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='major2', to='base.majororminor'),
        ),
        migrations.AlterField(
            model_name='student',
            name='minor1',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='minor1', to='base.majororminor'),
        ),
        migrations.AlterField(
            model_name='student',
            name='minor2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='minor2', to='base.majororminor'),
        ),
    ]
