import streamlit as st
import streamlit.components.v1 as components

def expanding_textbox(label="Your Answer", key="user_answer"):
    placeholder = "Type your answer here..."

    st.markdown(f"### 💬 {label}")

    # Render the expanding textarea
    components.html(f"""
        <textarea id="{key}" rows="4" placeholder="{placeholder}" 
            style="width: 100%; border-radius: 10px; padding: 10px; font-size: 16px; resize: none;"
            oninput="this.style.height='';this.style.height=this.scrollHeight + 'px'"></textarea>

        <script>
            const answerBox = document.getElementById("{key}");
            answerBox.addEventListener("input", function() {{
                window.parent.postMessage({{type: 'streamlit:setComponentValue', value: answerBox.value}}, '*');
            }});
        </script>
    """, height=200)

    return st.text_input("🧠 Hidden Sync", key=f"{key}_input", label_visibility="collapsed")
