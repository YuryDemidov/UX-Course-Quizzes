function doQuiz(){try{quizdata=jQuery.parseJSON($("#data").html())}catch(a){throw $("#quiz_wrap").append("<h1>Error Loading Quiz</h1>"),new Error(a)}$("#quiz_wrap").append("<h1>Udemy Quiz</h1>"),$("#quiz_wrap").append("<h2>Questions: "+quizdata.count+"</h2>"),$("#quiz_wrap").append('<button onclick="startQuiz()" id="start">Start Quiz</button>')}function startQuiz(){display_ques(1)}function display_ques(c){if(c>quizdata.count){finishQuiz()}else{if($("#quiz_wrap").html(""),$("#quiz_wrap").append("<h2>Question #"+c+"</h2>"),$("#quiz_wrap").append("<h4>Score: "+score+"</h4>"),qdata=quizdata.results[c-1],"true-false"==qdata.assessment_type&&($("#quiz_wrap").append(qdata.prompt.question),$("#quiz_wrap").append('<button class="tbut" onclick="check_ques({0}, 1)" id="start">True</button>&nbsp;&nbsp;'.format(c)),$("#quiz_wrap").append('<button class="tbut" onclick="check_ques({0}, 0)" id="start">False</button>'.format(c))),"multiple-choice"==qdata.assessment_type){$("#quiz_wrap").append(qdata.prompt.question);var b=["A","B","C","D","E"],f=["a","b","c","d","e"];for(i=0;i<qdata.prompt.answers.length;i++){$("#quiz_wrap").append("<h4>{0}: {1}</h4>".format(b[i],qdata.prompt.answers[i]))}for(i=0;i<qdata.prompt.answers.length;i++){$("#quiz_wrap").append('<button class="tbut" id="mbut" onclick="check_ques({0}, {1})" id="start">'.format(c,"'"+f[i]+"'")+b[i]+"</button>&nbsp;")}}if("fill-in-the-blanks"==qdata.assessment_type){var d=[];for(i=0;i<qdata.correct_response.length;i++){d[i]='<input type="text" id="{0}"></input>'.format("ans"+i)}$("#quiz_wrap").append(qdata.prompt.question),$("#quiz_wrap p").children("u-blank").each(function(a){$(this).append(d[a])}),$("#quiz_wrap").append('<button class="tbut" onclick="check_ques({0}, false)" id="start">Check Answer(s)</button>'.format(c))}"coding-challenge"==qdata.assessment_type&&display_ques(c+1)}}function check_ques(c,b){if(qdata=quizdata.results[c-1],"true-false"==qdata.assessment_type&&(qdata.correct_response[0]==String(Boolean(b))?($(".tbut").attr("disabled","disabled"),$("#quiz_wrap").append("<h3>Answer: "+qdata.correct_response[0]),$("#quiz_wrap").append('<button onclick="display_ques('+Number(c+1)+')" id="start">Continue</button>'),score++):($(".tbut").attr("disabled","disabled"),$("#quiz_wrap").append("<h3>Answer: "+qdata.correct_response[0]),$("#quiz_wrap").append('<button class="wbut" onclick="display_ques('+Number(c+1)+')" id="start">Continue</button>'))),"coding-challenge"==qdata.assessment_type,"multiple-choice"==qdata.assessment_type&&(qdata.correct_response[0]==b?($(".tbut").attr("disabled","disabled"),score++,$("#quiz_wrap").append("<h3>Answer: "+qdata.correct_response[0]),$("#quiz_wrap").append('<button onclick="display_ques('+Number(c+1)+')" id="start">Continue</button>')):($(".tbut").attr("disabled","disabled"),$("#quiz_wrap").append("<h3>Answer: "+qdata.correct_response[0]),$("#quiz_wrap").append('<button class="wbut" onclick="display_ques('+Number(c+1)+')" id="start">Continue</button>'))),"fill-in-the-blanks"==qdata.assessment_type){$(".tbut").attr("disabled","disabled");var d=0;for(i=0;i<qdata.correct_response.length;i++){$("#ans"+i).attr("disabled","disabled"),answer=$("#ans"+i).val(),answer==qdata.correct_response[i]?($("#quiz_wrap").append("<h3>Correct Answer for #{0}: ".format(i+1)+qdata.correct_response[i]+"</h3>"),d++):$("#quiz_wrap").append("<h3>Correct Answer for #{0}: ".format(i+1)+qdata.correct_response[i]+"</h3>")}$("#quiz_wrap").append("<h3>Total Correct: {0}/{1}</h3>".format(d,qdata.correct_response.length)),d==qdata.correct_response.length?(score++,$("#quiz_wrap").append('<button onclick="display_ques('+Number(c+1)+')" id="start">Continue</button>')):$("#quiz_wrap").append('<button class="wbut" onclick="display_ques('+Number(c+1)+')" id="start">Continue</button>')}}function finishQuiz(){$("#quiz_wrap").html(""),$("#quiz_wrap").append("<h1>Score: {0}/{1}</h1>".format(score,quizdata.count)),$("#quiz_wrap").append("<h1>Score: {0}%</h1>".format(score/quizdata.count*100)),$("#quiz_wrap").append('<h3><a href="javascript:history.go(0)">Try Again</a></h3><h3><a href="../index.html">Home</a></h3>')}var quizdata,score=0;String.prototype.format||(String.prototype.format=function(){var c=this.toString();if(!arguments.length){return c}var b=typeof arguments[0],b="string"==b||"number"==b?arguments:arguments[0];for(arg in b){c=c.replace(RegExp("\\{"+arg+"\\}","gi"),b[arg])}return c}),$(document).ready(function(){doQuiz()});
