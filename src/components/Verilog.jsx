import React, { useState, useEffect } from 'react';

function Verilog() {
  const [verilogCode, setVerilogCode] = useState('');

  useEffect(() => {
    // Fetch Verilog code from the txt file in assets folder
    fetch('/assets/verilog.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Verilog code');
        }
        return response.text();
      })
      .then((text) => {
        setVerilogCode(text);
      })
      .catch((error) => {
        console.error('Error fetching Verilog code:', error);
      });
  }, []);

  return (
    <section>
      <h2>Verilog</h2>
      <p>Verilog is a hardware description language used to model electronic systems.</p>
      <p>
        Below is an online Verilog compiler that you can use to write and run Verilog code.
      </p>
      <p>
        I have attached a program in Verilog that simulates a 16-bit MIPS CPU. Just press the copy button and paste it into the JDoodle interface.
        Then scroll down and press the "Execute Program" button.
      </p>

      {/* Copy text to clipboard functionality */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(verilogCode);
          alert("Copied to clipboard!");
        }}
      >
        Copy Text
      </button>

      {/* JDoodle Embed */}
      <script
        src="https://www.jdoodle.com/assets/jdoodle-pym.min.js"
        type="text/javascript"
      ></script>
      <iframe
        src="https://www.jdoodle.com/embed/v1/2a526ce07b2bd697"
        width="100%"
        height="500"
        frameBorder="0"
        title="JDoodle Verilog"
      ></iframe>

      {/* Display the Verilog code */}
      <h3>Verilog MIPS CPU Code</h3>
      <pre>{verilogCode}</pre>
    </section>
  );
}

export default Verilog;