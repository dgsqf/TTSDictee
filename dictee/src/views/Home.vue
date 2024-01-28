<script>
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import data from '../data/dictees.json';
async function FetchDictees() {
  const { data, error } = await supabase.from("Dictee").select();
  return data;
}
function fetchAllDataFromLocalStorage() {
  const data = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    //Value is in the pattern title#source#text
    if (key.startsWith("extern") || key.startsWith("local")){
      let valuesplit = value.split("#")
      data.push({
        id: key,
        title: valuesplit[0],
      });
    }
  }
  return data;
}
function fetchHardcoded() {
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    localStorage.setItem(element.id, element.title + "#" + element.source + "#" + element.text)
  }
}

export default {
  data() {
    return {
      dictees: [],
    };
  },

  async mounted() {
    fetchHardcoded();
    const data = fetchAllDataFromLocalStorage();
    console.log(data)
    const route = useRoute();
    this.dictees = data;
  },
};
</script>

<template>
  <div style="
      display: grid;

      grid-template-columns: repeat(auto-fill, minmax(310px, 2fr));
      grid-gap: 10px;
    ">
    <Card v-for="dictee in dictees" :title="dictee.title" :id="dictee.id" :tags="dictee.tags" style="margin: 10px"
      class="card"></Card>
  </div>
</template>
