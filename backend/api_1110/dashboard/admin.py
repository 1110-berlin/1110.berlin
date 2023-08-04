from django.contrib import admin
from .models import UserProfile, ApiUsage, UserMarketing, Tool, Cmd, Scan, ToolOutput


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "comapany", "job_title")
    list_filter = ("comapany", "job_title")


@admin.register(ApiUsage)
class ApiUsageAdmin(admin.ModelAdmin):
    list_display = ("user", "api_key", "paid")
    list_filter = ("paid",)


@admin.register(UserMarketing)
class UserMarketingAdmin(admin.ModelAdmin):
    list_display = ("user", "recieve_mail", "min_interval_days", "text_only")
    list_filter = ("recieve_mail", "text_only")


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(Cmd)
class CmdAdmin(admin.ModelAdmin):
    list_display = ("base_cmd", "replace_str", "mode", "tool")
    list_filter = ("mode", "tool")


@admin.register(Scan)
class ScanAdmin(admin.ModelAdmin):
    list_display = ("user", "tool", "scan_id")
    list_filter = ("tool",)


@admin.register(ToolOutput)
class ToolOutputAdmin(admin.ModelAdmin):
    list_display = ("tool", "scan", "partial")
    list_filter = ("tool", "scan")
