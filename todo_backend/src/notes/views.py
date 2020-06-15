from django.shortcuts import render
from .forms import NoteForm
from django.contrib.auth.models import User
from .models import Note
# Create your views here.


def note(request):
    msg = None
    if request.method == 'GET':
        form = NoteForm()
        args = {'form': form}
        return render(request, 'create_note.html', args)
    else:
        form = NoteForm(request.POST)
        if form.is_valid():
            user = User.objects.filter(username=request.user.username)
            form.user = user[0]
            form.save()
            msg = 'Note "%s" got created'%form.data['title']
            form.clean()
            return render(request, 'create_note.html', {'msg':msg, 'form':NoteForm()})
        return render(request, 'create_note.html', {'msg': msg, 'form': form})

def list_notes(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        form = []
        for note in notes:
            form.append({'title':note.title, 'text':note.text, 'id':note.id})
        print(form)
    return render(request, 'list_notes.html', {'form':form})

def share(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        form = []
        for note in notes:
            for u in note.s_users.all():
                if u.username!=request.user.username:
                    form.append({'title': note.title, 'text': note.text, 'shared_with':u.username})
        # print(form)
    return render(request, 'share_list.html', {'form': form})

def delete_note(request):
    msg = None
    if request.method == 'GET':
        delete_note_id = int(request.GET['param'])
        instance = Note.objects.filter(id=delete_note_id)
        if instance:
            note_title = instance[0].title
            instance.delete()
            msg = 'Note "%s" got deleted' % note_title
        notes = Note.objects.all()
        form = []
        for note in notes:
            for u in note.s_users.all():
                if u.username!=request.user.username:
                    form.append({'title': note.title, 'text': note.text, 'shared_with':u.username, 'msg':msg})
    return render(request, 'list_notes.html', {'form': form, 'msg':msg})



