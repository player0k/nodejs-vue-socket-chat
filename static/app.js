const { createApp, ref, onMounted } = Vue

createApp({
    setup() {
        const message = ref('')
        const messages = ref([])
        const socket = ref(null)

        const sendMessage = () => {
            if (message.value) {
                socket.value.emit('send_chat_message', message.value)
                message.value = ''
            }
        }

        onMounted(() => {
            socket.value = io(window.location.href).connect()

            socket.value.on('chat_message', (data) => {
                messages.value.push({
                    text: data,
                    date: new Date().toLocaleString()
                })
            })
        })

        return {
            message,
            messages,
            sendMessage
        }
    }
}).mount('#chat-app')