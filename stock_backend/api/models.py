from django.db import models

class StockData(models.Model):
    Symbol = models.CharField(max_length=50, unique=True)  # Increased length
    Open = models.DecimalField(max_digits=15, decimal_places=8)  # Increased precision
    High = models.DecimalField(max_digits=15, decimal_places=8)
    Low = models.DecimalField(max_digits=15, decimal_places=8)
    Close = models.DecimalField(max_digits=15, decimal_places=8)
    CurrentPrice = models.DecimalField(max_digits=15, decimal_places=8)
    PreviousClose = models.DecimalField(max_digits=15, decimal_places=8)
    FiftyTwoWeekLow = models.DecimalField(max_digits=15, decimal_places=8)
    FiftyTwoWeekHigh = models.DecimalField(max_digits=15, decimal_places=8)
    WeeklyLow = models.DecimalField(max_digits=15, decimal_places=8)
    WeeklyHigh = models.DecimalField(max_digits=15, decimal_places=8)
    MonthlyLow = models.DecimalField(max_digits=15, decimal_places=8)
    MonthlyHigh = models.DecimalField(max_digits=15, decimal_places=8)
    MarketCap = models.BigIntegerField(null=True)
    CompanyName = models.CharField(max_length=500)  # Increased length
    Currency = models.CharField(max_length=10)
    PercentageChange = models.DecimalField(max_digits=10, decimal_places=6)  # Increased precision
    PriceChange = models.CharField(max_length=20)  # Increased length
    MarketState = models.CharField(max_length=20)  # Increased length
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Symbol

