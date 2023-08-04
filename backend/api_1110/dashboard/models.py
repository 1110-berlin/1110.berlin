from django.db import models
from django.contrib.auth.models import User


####
# -> User related models, like you bae
####
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(
        upload_to="profile_pics/", default="profile_pics/default.jpg"
    )
    comapany = models.CharField(max_length=50)
    job_title = models.CharField(max_length=50)

    def __str__(self):
        return self.user.username


class ApiUsage(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    api_key = models.CharField(max_length=36, unique=True)
    paid = models.BooleanField()


class UserMarketing(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    recieve_mail = models.BooleanField()
    min_interval_days = models.IntegerField()
    text_only = models.BooleanField()


####
# -----------------------------------------------------------------------------
####


####
# -> Tool related models, like you bae
####
class Tool(models.Model):
    name = models.CharField(max_length=36)
    description = models.TextField()

    def __str__(self):
        return self.name


class Cmd(models.Model):
    base_cmd = models.CharField(max_length=150)
    replace_str = models.CharField(max_length=15)
    mode = models.CharField(max_length=20)
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)

    def __str__(self):
        return self.tool.base_cmd


class Scan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)
    scan_id = models.CharField(max_length=36)  # uuid v4

    def __str__(self):
        return f"{self.tool.name}_{self.user.username}__{self.scan_id}"


class ToolOutput(models.Model):
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)
    scan = models.ForeignKey(Scan, on_delete=models.CASCADE)
    partial = models.IntegerField()
    raw_log = models.TextField()
    parsed_log = models.JSONField()

    def __str__(self):
        return f"{self.partial}_{self.tool.name}_{self.scan.scan_id}"


####
# -----------------------------------------------------------------------------
####
