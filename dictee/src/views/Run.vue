<script>
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabaseClient";
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

    return { id };
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
  <audio controls :src="id"></audio>

  <form style="padding: 50px">
    <textarea
      v-model="text"
      style="
        width: 100%;
        height: 500px;
        background: #000020;
        border: none;
        color: #eaeaf7;
      "
    ></textarea>
  </form>
  <button @click="correct = true">Corriger</button>

  <Difference v-if="correct" :entered="text" :corrected="ctext"></Difference>
  <p style="text-align: right">{{ source }}</p>
</template>
