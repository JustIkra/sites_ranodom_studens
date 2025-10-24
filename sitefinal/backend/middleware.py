"""
Custom middleware for request logging
"""
import logging
import time

logger = logging.getLogger('django.request')


class RequestLoggingMiddleware:
    """Middleware to log all HTTP requests"""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log request
        start_time = time.time()

        # Get response
        response = self.get_response(request)

        # Calculate request duration
        duration = time.time() - start_time

        # Log the request
        logger.info(
            f"{request.method} {request.path} - "
            f"Status: {response.status_code} - "
            f"Duration: {duration:.3f}s - "
            f"User: {request.user if hasattr(request, 'user') else 'Anonymous'} - "
            f"IP: {self.get_client_ip(request)}"
        )

        return response

    @staticmethod
    def get_client_ip(request):
        """Get client IP address from request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
