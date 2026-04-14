from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_joblisting_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='joblisting',
            name='show_in_discover',
            field=models.BooleanField(default=True),
        ),
    ]
