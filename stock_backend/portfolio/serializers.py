from rest_framework import serializers

class PortfolioPerformanceSerializer(serializers.Serializer):
    symbol = serializers.CharField()
    company_name = serializers.CharField()
    today_percent_change = serializers.FloatField(allow_null=True)
    weekly_percent_change = serializers.FloatField(allow_null=True)
    monthly_percent_change = serializers.FloatField(allow_null=True)
    yearly_percent_change = serializers.FloatField(allow_null=True)
