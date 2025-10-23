from django.db.models import Sum
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Project, Donation
from .serializers import ProjectSerializer, DonationSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('id')
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def totals(self, request):
        data = list(self.get_queryset().values('slug', 'title', 'goal', 'collected'))
        overall = self.get_queryset().aggregate(total_collected=Sum('collected'), total_goal=Sum('goal'))
        return Response({
            'projects': data,
            'overall': overall,
        })

    @action(detail=False, methods=['get'], url_path='rows')
    def rows(self, request):
        rows = list(self.get_queryset().values('slug', 'collected', 'goal'))
        return Response(rows)


class DonationViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Donation.objects.select_related('project').order_by('-created_at')
    serializer_class = DonationSerializer
    permission_classes = [AllowAny]

# Create your views here.
