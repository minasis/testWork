<template>
    <div class="mainChartWrap" id="mainChartWrap">
        <h1 id="drivinghabit_report">월별 그래프</h1>
        <svg class="mainChart"></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';
export default {
    data:function(){
        return{
            recentRecord:[{
                date: "2018/4",
                score: "40"
            }, {
                date: "2018/5",
                score: "70"
            }, {
                date: "2018/7",
                score: "69"
            }, {
                date: "2018/8",
                score: "92"
            }],
            viewer:{
                width:0,
                height:0
            },
            scale:{
                x:null,
                y:null
            }
        }
    },
    created(){
        var scoreData = this.recentRecord;
        if(scoreData.length < 5){
            var tempArr = new Array();
			for (var i = 0; i < 5; i++) {
				var now = new Date();
				now = [now.getFullYear(), (now.getMonth() + 1) - i]
				if(now[1] == 0){
					now[0] -= 1;
					now[1] = 12;
				}
				var date = now[0] + "/" + now[1];
                var index = scoreData.map(function(e) { return e.date; }).indexOf(date)                
				if(index >= 0){
					tempArr.unshift(scoreData[index])
				}else{
					var tempObj = {"date":date,"score":0};
					tempArr.unshift(tempObj)
				}
			}
			this.recentRecord = tempArr;
        }
    },
    mounted(){
        var obj = this;        
        obj.viewer.width = obj.$el.children[1].clientWidth;
        obj.viewer.height = obj.$el.children[1].clientHeight - 20;
        obj.scale.x = obj.getScaleX();
        obj.scale.y = obj.getScaleY();
        
        obj.chartDraw();
    },
    methods:{
        getScaleX: function(){
            return d3.scaleBand()
                     .domain(this.recentRecord.map(function(d, i){
                             var split = "";
                             var time = "";
                             var miliTime = "";
                             if(d.date.indexOf("/") < 0){
                                 var lastIndex = this.recentRecord.findIndex(function(ele){return ele.score != -1})
                                 var lastDateSplit = this.recentRecord[lastIndex].date.split("/");
                                 time = new Date(lastDateSplit[0], lastDateSplit[1]);
                                 miliTime = time.getTime() + (3600 * 24 * 1000 * (i - lastIndex))
                             }else{
                                 split = d.date.split("/");
                                 time = new Date(split[0], parseInt(split[1]) - 1);			   			
                                 miliTime = time.getTime();
                             }

                             return miliTime;
                         }))
                     .rangeRound([5, this.viewer.width - 5])
                     .paddingInner(0.68)
                     .paddingOuter(0.15);
        },
        getScaleY: function(){
            return d3.scaleLinear()
                        .domain([0, 100])
                        .rangeRound([0, this.viewer.height - 25]);
        },
        chartDraw: function(){
            var obj = this;
            var scoreSvg = d3.select(obj.$el.children[1])
            var svgDefs = scoreSvg.append('defs');

            this.setGradiunt(svgDefs);
            console.log(obj.viewer.height)
            var bars = scoreSvg.selectAll("rect")
                                .remove()
                                .exit()
                                .data(obj.recentRecord);

            bars.enter().append("rect")
                .attr("x", function(d, i){		
                    var split = "";
                    var time = "";
                    var miliTime = "";
                    if(d.date.indexOf("/") < 0){
                        var lastIndex = obj.recentRecord.findIndex(function(ele){return ele.score != -1})
                        var lastDateSplit = obj.recentRecord[lastIndex].date.split("/");	   			
                        time = new Date(lastDateSplit[0], lastDateSplit[1]);		   			
                        miliTime = time.getTime() + (3600 * 24 * 1000 * (i - lastIndex))
                    }else{
                        split = d.date.split("/");
                        time = new Date(split[0], parseInt(split[1]) - 1);
                        miliTime = time.getTime();
                    }

                    return obj.scale.x(miliTime) + ((obj.scale.x.bandwidth() - 12) / 2);
                })
                .attr("y", function(d){			
                    return	obj.viewer.height;
                })
                .attr("width", function(){
                    return 12;
                })
                .attr("class", function(d, i){
                    if(!$(".wrap").hasClass("nonData") && d.score != 0){
                        var tempType = switchType("score", d);
                        return getGrade(tempType)	
                    }else{
                        return "default"
                    }
                
                })
                .attr("y", function(d){
                    var tempType = switchType("score", d);

                    if(tempType <= 0){
                        tempType = 100
                    }

                    return	obj.viewer.height - obj.scale.y(tempType)
                })
                .attr("height", function(d){
                    var tempType = switchType("score", d);
                    var percent = 100 * 0.01;

                    if(tempType > percent){
                        return obj.scale.y(tempType)
                    }else if(tempType <= 0){
                        return obj.scale.y(100)
                    }
                });
            var clickBar = scoreSvg.append("g")
                                    .attr("class", "clickBar")
                                    .selectAll("rect")
                                    .remove()
                                    .exit()
                                    .data(obj.recentRecord);

            clickBar.enter().append("rect")
                .attr("x", function(d, i){		
                    var split = "";
                    var time = "";
                    var miliTime = "";
                    if(d.date.indexOf("/") < 0){
                        var lastIndex = obj.recentRecord.findIndex(function(ele){return ele.score != -1})
                        var lastDateSplit = obj.recentRecord[lastIndex].date.split("/");
                        time = new Date(lastDateSplit[0], lastDateSplit[1]);
                        miliTime = time.getTime() + (3600 * 24 * 1000 * (i - lastIndex))
                    }else{
                        split = d.date.split("/");
                        time = new Date(split[0], parseInt(split[1]) - 1);
                        miliTime = time.getTime();
                    }

                    // if(i == 4){
                    //     $(".mainChartWrap h1").click(function(){
                    //         var month = d.date.split("/")[1]
                    //         location.href = "/publishing/drivingHabit/myscore_month.html?index=" + month
                    //     })
                    // }
                    return obj.scale.x(miliTime) + ((obj.scale.x.bandwidth() - 12) / 2) - 18;
                })
                .attr("width", function(){
                    return 48;
                })
                .attr("fill", "transparent")
                .on("click", function(d, index){
                    var href = ""
                    if(!$(".wrap").hasClass("nonData")){
                        var month = d.date.split("/")[1]
                        href = "/publishing/drivingHabit/myscore_month.html?index=" + month	
                    }else{
                        href = "/publishing/drivingHabit/myscore_month.html?zero"
                    }
                    location.href = href;
                })
                // .on("touchstart", function(d, i){
                //     event.stopPropagation()
                //     $(".mainChart > rect").eq(i).attr("class", $(".mainChart > rect").eq(i).attr("class") + " touch")
                // })
                // .on("touchend", function(d,i){
                //     event.stopPropagation()
                //     $(".mainChart > rect").eq(i).attr("class", $(".mainChart > rect").eq(i).attr("class").replace(" touch", ""))
                // })
                .attr("y", function(d){
                    return	obj.viewer.height - obj.scale.y(100)
                })
                .attr("height", function(d){
                    return obj.scale.y(100)
                });

                var texts = scoreSvg.selectAll("text")
                                 .remove()
                                 .exit()
                                 .data(obj.recentRecord)
                        
                texts.enter().append("text")
                        .text(function(d){
                            var tempType = switchType("score", d);

                            if(tempType > 0){
                                return	tempType
                            }else{
                                return ""
                            }
                        })
                        .attr("class", function(d,i){
                            if($(".recentPatturn .rightTitle").text() != "�쇰퀎 �먯닔" || 
                                $(".recentPatturn").hasClass("firstUser")) {return "num";}
                            return "num " + getGrade(d.score)
                        })
                        .attr("x", function(d, i){
                            if(d.date.indexOf("/") < 0){return "";}
                            var position = parseInt($("rect").eq(i).attr("x"));
                            var textWidth = 12 - this.getBBox().width;
                        
                            position += (textWidth / 2);
                            return position>0?position:0;
                        })
                        .attr("y", function(d){
                            return obj.viewer.height - obj.scale.y(switchType("score", d)) - 5
                        })

                var prevMonth = 0;
                scoreSvg.append("g")
                        .call(d3.axisBottom(obj.scale.x).tickFormat(function(d, i){				
                            //if(obj.recentRecord[i].score < 0){return "8��"}
                            var time = new Date(d);				
                            var month = time.getMonth();
                            //delete time;
                            
                            if(i == 0 || prevMonth != month){
                                prevMonth = month;
                                month += 1
                            }else{
                                month = ""
                            }
                            
                            return month + "월";
                        }).tickSizeOuter(0))
                        .attr("transform", "translate(0, " + (obj.viewer.height) + ")")
                        .attr("class", "axis");

                $(".axis text").attr("transform", "translate(0, -1)")
        },
        setGradiunt: function(svgDefs){
            var mainGradient_ghost = svgDefs.append('linearGradient').attr('id', 'mainGradient_ghost').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
            var mainGradient_grade5 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade5').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
            var mainGradient_grade4 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade4').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
            var mainGradient_grade3 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade3').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
            var mainGradient_grade2 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade2').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
            var mainGradient_grade1 = svgDefs.append('linearGradient').attr('id', 'mainGradient_grade1').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");
            var mainGradient_gray = svgDefs.append('linearGradient').attr('id', 'mainGradient_gray').attr("y2", "100%").attr("x1", "0").attr("x2","0").attr("y1","0");

            mainGradient_ghost.append('stop')
                .attr('class', 'stop-left-ghost')
                .attr('offset', '0');

            mainGradient_ghost.append('stop')
                .attr('class', 'stop-right-ghost')
                .attr('offset', '1');

            mainGradient_grade5.append('stop')
                .attr('class', 'stop-left-grade5')
                .attr('offset', '0');

            mainGradient_grade5.append('stop')
                .attr('class', 'stop-right-grade5')
                .attr('offset', '1');

            mainGradient_grade4.append('stop')
                .attr('class', 'stop-left-grade4')
                .attr('offset', '0');

            mainGradient_grade4.append('stop')
                .attr('class', 'stop-right-grade4')
                .attr('offset', '1');

            mainGradient_grade3.append('stop')
                .attr('class', 'stop-left-grade3')
                .attr('offset', '0');

            mainGradient_grade3.append('stop')
                .attr('class', 'stop-right-grade3')
                .attr('offset', '1');

            mainGradient_grade2.append('stop')
                .attr('class', 'stop-left-grade2')
                .attr('offset', '0');

            mainGradient_grade2.append('stop')
                .attr('class', 'stop-right-grade2')
                .attr('offset', '1');

            mainGradient_grade1.append('stop')
                .attr('class', 'stop-left-grade1')
                .attr('offset', '0');

            mainGradient_grade1.append('stop')
                .attr('class', 'stop-right-grade1')
                .attr('offset', '1');

            mainGradient_gray.append('stop')
                .attr('class', 'stop-left-gray')
                .attr('offset', '0');

            mainGradient_gray.append('stop')
                .attr('class', 'stop-right-gray')
                .attr('offset', '1');	
        }
    }
}

function switchType(type, obj){
    switch(type){
        case "score":
            return obj.score;
            break;
        case "default":
            return obj.default;
            break;
    }
}

function getGrade(score){ // 등급 클래스
	if(score < 0){
		return "ghost"
	}else if(score == 0){
		return "zero"
	}else if(score < 15){
		return "grade1";
	}else if(score < 30){
		return "grade2";
	}else if(score < 70){
		return "grade3"
	}else if(score < 85){
		return "grade4";
	}else {
		return "grade5"
	}
}
</script>

<style>
    .mainChartWrap {position:relative;}
    .mainChart {width:calc(100% - 40px);margin: 0 20px 2px; height: 110px;}
    .mainChart > rect {animation:barTouchOut ease-out 0.2s forwards;}
    .mainChart > rect.touch {animation:barTouch ease-out 0.2s forwards;}
    .mainChart text {font-size: 1.5rem; fill:#666666;}
    .mainChart .axis path {stroke:#ededed;}
    .mainChart .axis text {font-size: 1.4rem; fill:#999;}

</style>
