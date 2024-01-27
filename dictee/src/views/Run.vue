<script>
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import {playText} from "../lib/player.js"
async function FetchText(id) {
  const { data, error } = await supabase
    .from("Dictee")
    .select()
    .eq("id", parseInt(id));
  return data;
}

export default {
  data() {
    return {
      text: "",
      correct: false,
      ctext: "",
      source: "",
    };
  },

  setup() {
    const route = useRoute();
    const id = "../audio/" + route.params.id + ".mp3";

    return { id,playText};
  },
  async mounted() {
    const route = useRoute();
    let data = await FetchText(route.params.id);
    this.ctext = data[0].text;
    this.source = data[0].source;
  },
};
</script>

<template>
  <div style="display: flex; justify-content: center; margin: 2rem;">
    <button @click="playText(ctext)">Ecouter</button>
  </div>
  <div style="display: flex; justify-content: center; margin: 2rem;">
    <audio controls :src="id"></audio>
  </div>
  <div class="columns">
    <div class="column">
    <textarea v-model="text" style="
      resize: none;
        width: 100%;
        height: 500px;
        background: rgba(214, 214, 214, 0.26);
        border: none;
        color: #5c6166;
        padding: 2rem;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
      "></textarea>
    </div>
    <div class="column">
      <div style="
        width: 100%;
        height: 500px;
        background: rgba(214, 214, 214, 0.26);
        border: none;
        color: #5c6166;
        font-size: 1rem;
        padding: 2rem;
      "><Difference v-if="correct" :entered="text" :corrected="ctext"></Difference></div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; margin: 2rem;">
    <button @click="correct = true">Corriger</button>
  </div>
  <p style="text-align: right">{{ source }}</p>
</template>
