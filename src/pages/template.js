import "../css/main.css";

const Component = () => {
  // ------------------------------------ Initialisation ------------------------------------
  // --------------------------------------- State(s) ---------------------------------------
  // -------------------------------------- Handler(s) --------------------------------------
  // ----------------------------------------- View -----------------------------------------

  return (
    <div id="indexContainer">
      <div id="indexHeading">Heading</div>
      <div id="indexSubHeading">subHeading</div>
      <div id="indexText">Text here...</div>

      <a href="../pages/quiz.html" id="indexButton">
        Button leading to page...
      </a>
    </div>
  );
};

const styles = StyleSheet.create({});

export default Component;

// ----------------------------------------------------------------------------------------
