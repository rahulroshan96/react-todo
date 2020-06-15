from .models import Note
from django.forms.models import ModelForm
import django.forms as forms


class NoteForm(ModelForm):

    class Meta:
        model = Note
        fields = ('title', 'text', 's_users')
        labels = {
            's_users': 'Share with Users',
        }
        widgets = {
            's_users': forms.CheckboxSelectMultiple()
        }
    def __init__(self, *args, **kwargs):
        super(NoteForm, self).__init__(*args, **kwargs)
        self.fields['s_users'].required = False



