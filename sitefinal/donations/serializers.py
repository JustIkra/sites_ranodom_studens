from rest_framework import serializers
from .models import Project, Donation


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'slug', 'title', 'goal', 'collected'
        ]


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'id', 'project', 'amount', 'created_at', 'donor_name', 'note'
        ]
        read_only_fields = ['created_at']




