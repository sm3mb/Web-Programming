package com.vijaya.speechtotext;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import java.text.SimpleDateFormat;
import java.util.Date;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;


import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    //---//
    private TextToSpeech textToSpeech;
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;
    private static final String PREFS = "prefs";
    private static final String NAME = "name";
    //---//
    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        preferences = getSharedPreferences(PREFS,0);// Extracting name and saving in editor
        editor = preferences.edit();

        mVoiceInputTv = (TextView) findViewById(R.id.voiceInput);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        mSpeakBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });

        textToSpeech = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            public void onInit(int status) {
                if (status == TextToSpeech.SUCCESS) {
                    int text = textToSpeech.setLanguage(Locale.UK);
                    speak("Hello, what is your name?"); // Now speak Hello
                } }});
    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello, How can I help you?");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    mVoiceInputTv.setText(result.get(0));
                    ArrayList<String> res = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    String inSpeech = res.get(0);
                    recognition(inSpeech);
                }
                break;
            }
        }
    }

    private void speak(String text){
        // Using TTS speak
        textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null);
    }

    private void recognition(String text){ // Recognize speaking
        //if the speech contains this words,start speaking
        Log.e("Speech","" + text);
        String[] speech = text.split(" ");
        if(text.contains("hi my name is ") || text.contains("Hi my name is ")){
            String name = speech[speech.length-1];
            editor.putString(NAME,name).apply(); // Put the name in Editor
            speak("How are you today?" + preferences.getString(NAME, null));
        }
        else if(text.contains("I'm not feeling good what should I do")){// user will ask this
            speak("Please stay at home and be in self isolation");// speaker answer
        }
        else if(text.contains("What medicine should I take") || text.contains("what medicine should I take")){ // user will ask this
            speak(preferences.getString(NAME, null) + ", I think you have Covid19. Please take Pfizer.");// speaker answer
        }
         else if(text.contains("Do you understand me") || text.contains("do you understand me")) {
            speak("Yes, you are not feeling well.");
        }
        else if(text.contains("Thank you") || text.contains("thank you")){// user will ask this
            speak("Thank you too " + preferences.getString(NAME, null) + "Take care");//speaker answer
        }
        else if(text.contains("What time is it") || text.contains("what time is it")) {// Time asking
            SimpleDateFormat sdfDate = new SimpleDateFormat("HH:mm");//dd/MM/yyyy
            Date now = new Date();
            String[] strDate = sdfDate.format(now).split(":");
            if (strDate[1].contains("00"))
                strDate[1] = "o'clock";
            speak("The time is " + sdfDate.format(now));
        }
    }
}