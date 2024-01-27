<script>
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabaseClient";
async function FetchDictees() {
  const { data, error } = await supabase.from("Dictee").select();
  return data;
}

export default {
  data() {
    return {
      dictees: [],
    };
  },

  async mounted() {
    const route = useRoute();
    let data = await FetchDictees();
    this.dictees = data;
  },
};
</script>

<template>
  <div
    style="
      display: grid;

      grid-template-columns: repeat(auto-fill, minmax(310px, 2fr));
      grid-gap: 10px;
    "
  >
    <Card
      v-for="dictee in dictees"
      :title="dictee.title"
      :id="dictee.id"
      :tags="dictee.tags"
      style="margin: 10px"
      class="card"
    ></Card>
  </div>
</template>
