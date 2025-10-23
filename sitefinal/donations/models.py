from django.db import models


class Project(models.Model):
    slug = models.SlugField(max_length=64, unique=True)
    title = models.CharField(max_length=255)
    goal = models.PositiveBigIntegerField(default=0)
    # Cached total collected; updated on donation save for fast reads
    collected = models.PositiveBigIntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.title} ({self.slug})"


class Donation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='donations')
    amount = models.PositiveBigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    donor_name = models.CharField(max_length=255, blank=True)
    note = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        previous_amount = 0
        if not is_new:
            try:
                previous_amount = Donation.objects.only('amount').get(pk=self.pk).amount
            except Donation.DoesNotExist:
                previous_amount = 0
        super().save(*args, **kwargs)
        delta = self.amount - previous_amount if not is_new else self.amount
        Project.objects.filter(pk=self.project_id).update(collected=models.F('collected') + delta)

    def delete(self, *args, **kwargs):
        amount = self.amount
        project_id = self.project_id
        super().delete(*args, **kwargs)
        Project.objects.filter(pk=project_id).update(collected=models.F('collected') - amount)

# Create your models here.
