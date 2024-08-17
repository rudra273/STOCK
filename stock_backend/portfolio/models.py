
from django.contrib.auth.models import User
from django.db import models

class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_symbol = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.stock_symbol}"

