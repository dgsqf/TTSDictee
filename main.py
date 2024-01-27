from gtts import gTTS
from gtts.tokenizer import pre_processors
from gtts.tokenizer.core import Tokenizer
from pydub import AudioSegment
text =""" Je me souviens d’un jour d’automne où, le dîner étant servi, la nuit s’était faite dans la chambre. Ma cousine et moi nous poursuivions l’une l’autre à travers les arbres, c’est-à-dire sous les plis du rideau. L’appartement avait disparu à nos yeux et nous étions véritablement dans un sombre paysage à l’entrée de la nuit. On nous appelait pour dîner et nous n’entendions rien. Ma mère vint me prendre dans ses bras pour me porter à table et je me rappellerai toujours mon étonnement en voyant les objets réels qui m’environnaient. Je sortais d’une hallucination complète et il me coûtait d’en sortir si brusquement."""
i=0
splitted = []
temp = ""
second_of_silence = AudioSegment.silent(duration=1000)
full_audio = gTTS(text,lang='fr')
full_audio.save('temp/fulltext.mp3')
while i< len(text):
    print(i)
    if text[i] in [",",".","!",":","?",";"," - "] :
        temp+=text[i]
        splitted.append(temp)
        i+=1
        temp = ""
        continue
    else:
        temp+=text[i]
        i+=1
c=0
for s in splitted:
    s=s.replace('"', ' guillemets').replace('...', ' point de suspension').replace('.', ' point').replace(',', ' virgule').replace('!', ' point d\'exclamation').replace('?', ' point d\'interrogation').replace(';', ' point virgule').replace(':', ' deux point').replace(' - ', ' tiret')
    print(s)
    tts=gTTS(s,lang='fr',slow=True)
    tts.save("temp/"+str(c)+".mp3")
    c+=1



combined = AudioSegment.empty()
fulltext=AudioSegment.from_mp3("temp/fulltext.mp3")
combined+=fulltext
combined+=AudioSegment.silent(duration=1*60000)
secondfullaudio = gTTS(text.replace('...', ' point de suspension').replace('.', ' point').replace(',', ' virgule').replace('!', ' point d\'exclamation').replace('?', ' point d\'interrogation').replace(';', ' point virgule').replace(':', ' deux point').replace(' - ', ' tiret'),lang='fr')
secondfullaudio.save('temp/second.mp3')
fulltext=AudioSegment.from_mp3("temp/second.mp3")
for i in range(len(splitted)):
    audio=AudioSegment.from_mp3("temp/"+str(i)+".mp3")
    combined+=audio
    combined+=second_of_silence
    combined+=audio
    combined+=second_of_silence
    combined+=second_of_silence
relecture = (20*60-(combined.duration_seconds+fulltext.duration_seconds))/60
combined+=AudioSegment.silent(duration=relecture*60000)
combined+=fulltext
combined.export("audio/full.mp3", format="mp3")