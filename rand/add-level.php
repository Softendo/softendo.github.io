<html lang="en"><head>
    <meta charset="utf-8">
    <meta name="description" content="Build, play, and share Super Mario Construct levels!">
    <meta name="title" content="Level Palace | Play and share fun levels of Super Mario Construct!">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="propeller" content="e711179343918ea4ad434ff8675d8543">
    <title>Palace</title>
    <!-- Favicon -->
    <link rel="shortcut icon" href="images/logos/icon.png" type="image/x-icon">
    <!-- Google Icon Font -->
   <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- Materialize -->
    <link rel="stylesheet" href="https://softendo.github.io/styles/materialize.css" media="screen,projection">
    <!-- Progress -->
    <link rel="stylesheet" href="https://softendo.github.io/styles/progress.css">
    <!-- Styles -->
    <link rel="stylesheet" href="https://softendo.github.io/styles/dark.css" class="theme-type"><link rel="stylesheet" href="https://softendo.github.io/styles/3.css" class="theme-color"><link rel="stylesheet" href="https://softendo.github.io/styles/styles.css">    
    <!-- reCAPTCHA -->
    <script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/releases/Km9gKuG06He-isPsP6saG8cn/recaptcha__pt_br.js" crossorigin="anonymous" integrity="sha384-f3Rj1pMNd6cgweIqqnmEHO71vNiaVukqQIebxJT0NbQbbgtcSq1RhHJTdJ8u1Ns1"></script><script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/releases/Km9gKuG06He-isPsP6saG8cn/recaptcha__pt_br.js" crossorigin="anonymous" integrity="sha384-f3Rj1pMNd6cgweIqqnmEHO71vNiaVukqQIebxJT0NbQbbgtcSq1RhHJTdJ8u1Ns1"></script><script src="https://www.google.com/recaptcha/api.js"></script>
    <!-- jQuery -->
    <script type="text/javascript" src="js/jquery.js"></script>
    <script src="https://cdn.tiny.cloud/1/9o6zgw4ypy8my0tjwtjscm6dpyr1fh97h48zo7vpfen7llw8/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
<!--
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-8371413036585820",
              enable_page_level_ads: true
         });
    </script>
-->
  </head>
  <body>
    <div class="site-wrapper">
        
  



  
    <meta charset="utf-8">
    <meta name="description" content="Build, play, and share Super Mario Construct levels!">
    <meta name="title" content="Level Palace | Play and share fun levels of Super Mario Construct!">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="propeller" content="e711179343918ea4ad434ff8675d8543">
    <title>Level Palace | Level | Play and share Super Mario Construct levels!</title>
    <!-- Favicon -->
    <link rel="shortcut icon" href="images/logos/icon.png" type="image/x-icon">
    <!-- Google Icon Font -->
   <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- Materialize -->
    <link rel="stylesheet" href="https://softendo.github.io/styles/materialize.css" media="screen,projection">
    <!-- Progress -->
    <link rel="stylesheet" href="https://softendo.github.io/styles/progress.css">
    <!-- Styles -->
    <link rel="stylesheet" href="https://softendo.github.io/styles/dark.css" class="theme-type"><link rel="stylesheet" href="https://softendo.github.io/styles/3.css" class="theme-color"><link rel="stylesheet" href="https://softendo.github.io/styles/styles.css">    
    <!-- reCAPTCHA -->
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <!-- jQuery -->
    <script type="text/javascript" src="js/jquery.js"></script>
    <script src="https://cdn.tiny.cloud/1/9o6zgw4ypy8my0tjwtjscm6dpyr1fh97h48zo7vpfen7llw8/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
<!--
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-8371413036585820",
              enable_page_level_ads: true
         });
    </script>
-->
  
  
    <div class="site-wrapper">
        
       
    <div class="modal-content">
      <h4>Add a Level</h4>
      <div class="row">
       
                
        <p>SMC levels only.</p>
        <form class="add-level-form col s12" action="" method="post">
          <div class="row">
            <div class="input-field col s12 m6 l4">
              <input type="text" name="level-name" id="level-name" maxlength="50">
              <label for="level-name">Title</label>
            </div><!-- End input field -->
            <div class="input-field col s12 m6 l4">
              <select name="level-difficulty" id="level-difficulty">
                <option value="0">Select a Difficulty</option>
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
                <option value="4">Extreme</option>
              </select><!-- End select -->
              <label>Difficulty</label>
            </div><!-- End input field -->
          </div><!-- End row -->
          <div class="row">
            <div class="input-field col s12 m6 l4">
              <textarea class="materialize-textarea no-autoresize" id="level-code" name="level-code" maxlength="5000000"></textarea>
              <label for="level-code">Code</label>
            </div><!-- End input field -->
            <div class="input-field col s12 m6 l4">
              <textarea class="materialize-textarea no-autoresize" id="level-description" name="level-description" maxlength="5000" length="5000"></textarea>
              <label for="level-description">Description (optional)</label>
            </div><!-- End input field -->
            <div class="input-field col s12 m6 l4">
              <textarea class="materialize-textarea no-autoresize" id="level-contributors" name="level-contributors" maxlength="500" length="500"></textarea>
              <label for="level-contributors">Contributors (optional, for tag levels)</label>
            </div><!-- End column -->
          </div><!-- End row -->
          <div class="row">
            <a class="btn waves-effect save-level">Save Level
              <i class="material-icons right">save</i>
            </a>
            <a class="btn waves-effect publish-level">Publish
              <i class="material-icons right">publish</i>
            </a>
          </div><!-- End row -->
        </form><!-- End form -->        
      </div><!-- End row -->
    </div><!-- End modal content -->
     
</div></div></body></html>