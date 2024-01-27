<template>
   <pre><span v-for="span in spans" :style="{color: span.color}" style="white-space: normal" >{{ span.content }}</span></pre>

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
            const color = part.added ? 'lime' :
                part.removed ? 'red' : 'grey';
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