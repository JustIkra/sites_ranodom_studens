from django.contrib import admin
from .models import Project, Donation


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "goal", "collected")
    search_fields = ("title", "slug")


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ("project", "amount", "created_at", "donor_name")
    list_filter = ("project", "created_at")
    search_fields = ("donor_name", "note")

# Register your models here.
