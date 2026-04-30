from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0005_joblisting_show_in_discover'),
    ]

    operations = [
        migrations.AddField(
            model_name='joblisting',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tracked_jobs', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='source_job',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tracker_copies', to='api.joblisting'),
        ),
    ]
