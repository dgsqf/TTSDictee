<template>
   <span v-for="span in spans" :style="{color: span.color}" style="white-space: normal; font-family: 'Roboto'" >{{ span.content }}</span>
</template>

<script>
import { diffChars } from "diff"
import { ref, onMounted } from 'vue'
export default {
    props: ['corrected','entered'],
    setup(props) {
        const one = props.entered,
            other = props.corrected
        let spans = [];
        
        const display = ref(null)
        


        let span = null;

        const diff = diffChars(one, other);



        diff.forEach((part) => {
            // green for additions, red for deletions
            // grey for common parts
            const color = part.added ? '#86b300' :
                part.removed ? '#e65050' : '#5c6166';
            span = {
                color: color,
                content: part.value
            }


            spans.push(span)
            console.log(spans)
        });
        
        return { spans }
    }
    
}
</script>