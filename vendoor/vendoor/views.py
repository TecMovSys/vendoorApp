# vendoor/views.py

from django.http import HttpResponse
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def test_index(request):
    index_path = os.path.join(BASE_DIR, 'frontend', 'build', 'index.html')
    with open(index_path, 'r', encoding='utf-8') as f:
        return HttpResponse(f.read())
