<template>
    <div class="w-home">
        <p class="line-1 anim-typewriter">
            WELCOME TO SBS
        </p>
    </div>
</template>
<script>
export default {
    name: 'Home',
}
</script>
<style>
.w-home {
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.line-1{
    position: relative;
    top: 50%;  
    width: 24em;
    margin: 0 auto;
    border-right: 2px solid rgba(255,255,255,.75);
    font-size: 180%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    transform: translateY(-50%);    
}

/* Animation */
.anim-typewriter{
  animation: typewriter 4s steps(44) 1s 1 normal both,
             blinkTextCursor 500ms steps(44) infinite normal;
}
@keyframes typewriter{
    from {
        width: 0;
    }
    to {
        width: 24em;
    }
}
@keyframes blinkTextCursor{
    from{
        border-right-color: rgba(255,255,255,.75);
    }
    to {
        border-right-color: transparent;
    }
}
</style>