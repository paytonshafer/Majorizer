#This file is for controlling the django admin page located at '/admin'
#one can register other models so that they will show up on the admin dashboard
from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(MajorOrMinor)
admin.site.register(AdvStudConn)
admin.site.register(Student)
admin.site.register(Request)
admin.site.register(Semester)
admin.site.register(Schedule)

@admin.register(Course)
class ClassesAdmin(admin.ModelAdmin):
    list_filter = ['maj_min']

