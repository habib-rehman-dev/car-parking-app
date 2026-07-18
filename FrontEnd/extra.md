         onClick={() =>
          toast("Good Job!", {
            icon: "👏",
            style: {
              // Glassmorphism background (semi-transparent white)
              background: "rgba(255, 255, 255, 0.4)",

              // The key "glass" effect (blurring whatever is behind the toast)
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)", // Safari support

              // Clean, readable deep blue for the text
              color: "#1e3a8a",

              // Subtle border to give the "glass" a physical edge
              border: "1px solid rgba(255, 255, 255, 0.4)",

              // Smooth, rounded corners
              borderRadius: "16px",

              // Soft, deep shadow to lift it off the page
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",

              // Optional: add some padding for a cleaner layout
              padding: "12px 24px",
            },
          })
        }