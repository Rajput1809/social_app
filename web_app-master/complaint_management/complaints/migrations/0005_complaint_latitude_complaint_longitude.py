# Generated by Django 5.1.4 on 2024-12-21 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('complaints', '0004_rename_photo_complaint_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaint',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='complaint',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
