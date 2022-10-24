const form = document.getElementById('searchForm');
const ApiKey = '7540b6e4f23a1f8e3a9540f91f80b927';
// const ApiKey = '063bc2e727886ed9b4ff96cc392ad9c9';
const apiVersion = 3;
let queryData;
let movieDataTrendy = [];
let trendyPersonList = '';
let tmdbGenresList;
let trendyMode = 'week';

// Define a function that create a sheild cover the body
let windowShield = (popUp=false,closeItem='',videoSrc='') =>{

  d3.select('body')
  .append('div')
  .attr('class','cover')
  .on('click',(event,d)=>{
    if(closeItem !== ''){
      closeItem
      .style('opacity','1')
      .transition()
      .duration(600)
      .style('opacity','0')
      .end()
      .then(()=>{
        closeItem.style('display','none')
      });
    }
    if(videoSrc !== ''){
      videoSrc.attr('src', '');
    }

    if(popUp){
      clearPopUpContent();
    }else{
      // Clear the window cover shield
      d3.select('div.cover')
      .style("opacity", .6)
      .transition()
      .duration(300)
      .style("opacity", 0)
      .end()
      .then(()=>d3.select('div.cover').remove());
    }
  })
  .style("opacity", 0)
  .transition()
  .duration(300)
  .style("opacity", .6);
}
let createPopUp = (data, extraClassName, peoplePage = false)=>{
  let main = document.querySelector('main');
  let sectionContainer = document.createElement('section');
  sectionContainer.className = 'popup-window'+' '+extraClassName;

  main.appendChild(sectionContainer);
  let promise = [];

  if(data.runtime){
    sectionContainer.innerHTML = `
    <span id='movie-details-close-btn' class='close-btn'>x</span>
    <div class='pop-window-main-content'>
      <div class='pop-window-img-wrapper'>
        <img src="https://image.tmdb.org/t/p/original${data.poster_path}" alt="movie poster">
      </div>
      <div class='pop-window-text-wrapper'>
        <h1>${data.original_title}</h1>
        <p class="pop-window-text"><span class='popup-sub-title'>Release Date :</span> <span class='popup-highlight'>${data.release_date}</span></p>
        <p class="pop-window-text"><span class='popup-sub-title'>Genres :</span> ${displayGenres(data)}</p>
        <p class="pop-window-text"><span class='popup-sub-title'>Runtime :</span> <span class='popup-highlight'>${runTimeParsing(data)}</span></p>
        <p class="pop-window-text"><span class='popup-sub-title'>Average User Score :</span> <span class='popup-highlight'>${String(data.vote_average*10)+"%"}</span></p>
        <p class="pop-window-text"><span class='popup-sub-title'>Overview :</span> ${data.overview}</p>
        <span id='${data.id}' class="popup-movie-link">View Details</span>
      </div>
    </div>`;

  }else{
    //Pop up window for vertical bar chart timeline from the person's page
    sectionContainer.innerHTML = `
    <span id='movie-details-close-btn' class='close-btn'>x</span>
    <div class='pop-window-main-content'>
      <div class='pop-window-img-wrapper'>
        <img src="https://image.tmdb.org/t/p/original${data.poster_path}" alt="movie poster">
      </div>
      <div class='pop-window-text-wrapper'>
        <h1>${data.original_title}</h1>
        <p class="pop-window-text"><span class='popup-sub-title'>Release Date :</span> <span class='popup-highlight'>${data.release_date}</span></p>
        <p class="pop-window-text"><span class='popup-sub-title'>Genres :</span> ${displayGenres(data)}</p>
        <p class="pop-window-text"><span class='popup-sub-title'>Popularity Score :</span> <span class='popup-highlight'>${data.popularity}</span></p>
        <p class="pop-window-text"><span class='popup-sub-title'>Average User Score :</span> <span class='popup-highlight'>${String(data.vote_average*10)+"%"}</span></p>
        <p class="pop-window-text"><span class='popup-sub-title'>Overview :</span> ${data.overview}</p>
        <span id='${data.id}' class="popup-movie-link">View Details</span>
      </div>
    </div>`;

  }

  if (peoplePage) {
    sectionContainer.innerHTML = `
    <span id='movie-details-close-btn' class='close-btn'>x</span>
    <div class='pop-window-main-content'>
    </div>`
  }

  promise.push(sectionContainer.innerHTML)
  Promise.all(promise)
  .then(()=>{
    d3.select('.popup-window')
    .style("opacity", 0)
    .transition()
    .duration(300)
    .style("opacity", 1);

    let movieLink = document.getElementsByClassName('popup-movie-link');
    movieLink[0].addEventListener('click',()=>{
      let queryId = movieLink[0].id;
      clearPopUpContent();
      window.location.hash = `movie_id=${queryId}`;
    });
    document.getElementById('movie-details-close-btn').addEventListener('click',clearPopUpContent);
  })
  .catch(e=>console.log('error'));



}

let createPeoplePopUp = (data) => {
  let main = document.querySelector('main');
  let sectionContainer = document.createElement('section');
  sectionContainer.className = 'popup-window peoplePage'

  main.appendChild(sectionContainer);

  let promise = [];

  sectionContainer.innerHTML = `
  <span id='movie-details-close-btn' class='close-btn'>x</span>
  <div class='pop-window-main-content'>
  </div>`;

  Promise.all(promise)
  .then(()=>{
    d3.select('.popup-window')
    .style("opacity", 0)
    .transition()
    .duration(300)
    .style("opacity", 1);

    let movieLink = document.getElementsByClassName('popup-movie-link');
    for(let film of movieLink){
      film.addEventListener('click',()=>{
        let queryId = movieLink[0].id;
        clearPopUpContent();
        window.location.hash = `movie_id=${queryId}`;
      });
    }
    document.getElementById('movie-details-close-btn').addEventListener('click',clearPopUpContent);
  })
  .catch(e=>console.log('error'));

}

// Define a function to create a list of span elements that contain movie genres based on input data
let displayGenres = (dPt) => {
  let eleArr = ``;
  for(let genre of dPt.genres){
    eleArr += `<span class='movie-genre tooltip-text'>${genre['name']}</span>`;
  }
  return eleArr
}
let runTimeParsing = (d) =>{
  let time = String(parseInt(d.runtime/60))+"h"+" "+String(d.runtime%60)+"m";
  return time
}
let clearPopUpContent = () => {
  d3.select('.popup-window').remove();


  // Close the window shield if window shield is on
  if(d3.select('div.cover')._groups[0][0]){
    d3.select('div.cover')
    .style("opacity", .6)
    .transition()
    .duration(300)
    .style("opacity", 0)
    .end();

    d3.select('div.cover').remove();
  }
  // At movie page -> the closing function gets buggy, so place a recursive function to reassure the popup window close properly
  if (d3.select('.popup-window')._groups[0][0]) {
    clearPopUpContent();
  }
}
// Define a scattor plot object
class ScatterPlot {
  constructor(containerId, data, width, height){

    // Sort the data by popularity ing descending order, so d3 will plot the biggest bubble first and smaller ones latter.
    // This way, there won't have dots that are small and been plotted behind the bigger dots, which could not be interacted by users.
    this.data = data.sort((a,b)=> a.popularity>b.popularity? -1:1);

    // Define a 2-d array to store revenue&budget data to calculate min max value for coordinate system (x: budget, y: revenue)
    this.coordDomainData = {
      'budget' : [...data.map((dataPt) => dataPt.budget)],
      'revenue' : [...data.map((dataPt) => dataPt.revenue)],
      'revenue_per_budget' : [...data.map((dataPt) => dataPt.revenue_per_budget)],
      'runtime' : [...data.map((dataPt) => dataPt.runtime)],
      'popularity' : [...data.map((dataPt) => dataPt.popularity)],
      'vote_average' : [...data.map((dataPt) => dataPt.vote_average)]
    };

    this.initialDotDomain = {
      'popularity' : [...data.map((dataPt) => dataPt.popularity)]
    };
    // These variables are used to define size of the visualization canvas and the
    // margin (or "padding") around the scattter plot.  We use the margin to draw
    // things like axis labels.
    this.containerId = containerId;
    this.margin = {
      top:90,
      right:10,
      left:70,
      bottom: 60
    };
    this.height = height;
    this.width = width;

    // Create the SVG canvas that will be used to render the visualization.
    this.svg = d3.select("#"+this.containerId)
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);


    // Define a variety of scales, for color, x axis and y axis.
    this.x = d3.scaleLinear()
                // Define min & max value within the data we use to visualize
                .domain([0, d3.max(this.coordDomainData.budget)+d3.max(this.coordDomainData.budget)*0.2])
                .range([this.margin.left, this.width-this.margin.right]);

    this.y = d3.scaleLinear()
                .domain([d3.max(this.coordDomainData.revenue)+d3.max(this.coordDomainData.revenue)*0.2, 0])
                .range([this.margin.top,this.height-this.margin.bottom]);

    this.dotSize = d3.scaleLinear()
                // Define min & max value within the data we use to visualize
                .domain([d3.min(this.coordDomainData.popularity), d3.max(this.coordDomainData.popularity)])
                .range([d3.min(this.coordDomainData.popularity), d3.max(this.coordDomainData.popularity)]);

    this.colorScale = d3.scaleLinear()
                        .domain([d3.min(this.coordDomainData.vote_average), d3.max(this.coordDomainData.vote_average)])
                        .range(["#ededed", "#01b4e4"]);



    // Add axes.  First the X axis and label.
    this.xAxis = this.svg.append("g")
        .attr("class", "axis-x")
        .attr("transform", "translate(30,"+(this.height-this.margin.bottom)+")")
        .call(d3.axisBottom(this.x).ticks(5).tickPadding([10]).tickFormat((d)=>{
          let textForm;

          (d / 1e6)/1000 >= 1 ?
          textForm = '$ ' + String(((d / 1e6)/1000).toFixed(1)) + 'B' :
          textForm = '$ ' + String((d / 1e6).toFixed(1)) + 'M'

          return textForm;
        }));

    this.svg.append("text")
        .attr("class", "axis-label")
        .attr("y", this.height-this.margin.bottom/20)
        .attr("x",0 + (this.width / 1.8))
        .style("text-anchor", "middle")
        .text("Budget");

    // Now the Y axis and label.
    this.yAxis = this.svg.append("g")
        .attr("class", "axis-y")
        .attr("transform", "translate("+String(this.margin.left+30)+",0)")
        .call(d3.axisLeft(this.y).ticks(6).tickPadding([8]).tickFormat((d)=>{
          let textForm;

          (d / 1e6)/1000 >= 1 ?
          textForm = '$ ' + String(((d / 1e6)/1000).toFixed(1)) + 'B' :
          textForm = '$ ' + String((d / 1e6).toFixed(1)) + 'M'

          return textForm;
        }));

    this.svg.append("text")
        .attr("transform", "translate("+String(this.margin.left-33)+","+String(this.width / 2.7)+")rotate(-90)")
        .attr("class", "axis-label")
        // .attr("y", 15)
        // .attr("x",this.margin.left+30)
        .style("text-anchor", "middle")
        .text("Revenue");

  }

  render(){
    let thisViz = this;

    // Add the tooltip container to the vis container
    // it's invisible and its position/contents are defined during mouseover
    let tooltip = d3.select(".tooltip");

    // tooltip mouseover event handler
    thisViz.tipMouseOver = (event, d) => {

        // Latest D3 version (v6 onward) does not recognize d3.event.pageX & d3.event.pageY
        // It changes to d3.pointer(event, taget_container) where 2 position values (x, y) of the mouse position are returned.
        // 2nd argument is used to calculate the relative location of the tooltip so it can scale upon when the vessel's width and height change.

        let[x, y] = d3.pointer(event, thisViz.svg),
        revenueText,
        budgetText,
        balance,
        spendingPerformance;

        (d.revenue / 1e6)/1000 >= 1 ?
        revenueText = '$ ' + String(((d.revenue / 1e6)/1000).toFixed(2)) + ' billion' :
        revenueText = '$ ' + String((d.revenue / 1e6).toFixed(2)) + ' million';

        (d.budget / 1e6)/1000 >= 1 ?
        budgetText = '$ ' + String(((d.budget / 1e6)/1000).toFixed(2)) + ' billion' :
        budgetText = '$ ' + String((d.budget / 1e6).toFixed(2)) + ' million';

        (Math.abs(d.financial_balance) / 1e6)/1000 >= 1 ?
        balance = '$ ' + String(((Math.abs(d.financial_balance) / 1e6)/1000).toFixed(2)) + ' billion' :
        balance = '$ ' + String((Math.abs(d.financial_balance) / 1e6).toFixed(2)) + ' million';

        ((d.revenue_per_budget) / 1e6)/1000 >= 1 ?
        spendingPerformance = '$ ' + String((((d.revenue_per_budget) / 1e6)/1000).toFixed(2)) + ' billion' :
        ((d.revenue_per_budget) / 1e6) >= 1 ?
        spendingPerformance = '$ ' + String(((d.revenue_per_budget) / 1e6).toFixed(2)) + ' million':
        spendingPerformance = '$ ' + String(((d.revenue_per_budget)).toFixed(2));

        displayGenres(d);

        let balanceClass = d.revenue - d.budget > 0 ? 'revenue-text':'budget-text';
        let balanceText = d.revenue - d.budget > 0 ? 'Earned':'Loss';


        let htmlChild  = `<h1 class= 'tooltip-title'>${d.original_title + " ("+d.release_date.slice(0,4)+")"}</h1>
                    <p class='tooltip-sub-title'>Popularity Score : <span class = 'popularity-text'>${String(d.popularity.toFixed(1))}</span></p>
                    <p class='tooltip-sub-title'>Avg. User Score : <span class = 'popularity-text'>${String(Math.floor(d.vote_average*1000)/100)+"%"}</span></p>
                    <p class='tooltip-sub-title'>Revenue : <span class = 'revenue-text'>${revenueText}</span></p>
                    <p class='tooltip-sub-title'>Budget : <span class = 'budget-text'>${budgetText}</span></p>
                    <hr>
                    <p class='tooltip-sub-title'>Net ${balanceText} : <span class = ${balanceClass}>${balance}</span></p>
                    <p class='tooltip-sub-title'> Revenue / Budget: <span class = ${balanceClass}>${spendingPerformance}</span></p>`;

        // `${x+250 > thisViz.width ? String(x-(x+250-thisViz.width)):String(x+10)}`
        // `${y+400 > thisViz.height ? String(y-(y+400-thisViz.height)):String(y+20)}`
        //                     `<img src='https://image.tmdb.org/t/p/original${d.poster_path}' alt="tooltip movie poster" id="tooltip-poster"><br/>`

        tooltip.html(htmlChild)
        .style("left", `${String(x+20)}` + "px")
        .style("top", `${String(y/1.4)}` + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", .9)
        .style("display",'inline-block');

    };
    // tooltip mouseout event handler
    thisViz.tipMouseOut = () => {
      d3.selectAll(".tooltip")
            .transition()
            .duration(200) // ms
            .style("opacity", 0)
            .style("display",'none');
    };

    // Create the scatter variable: where both the circles and the brush take place
    let scatter = thisViz.svg
        .append('g')
        // Append a g tag to group the scatterplot.
        .attr('class','scatter-group')
        .selectAll('.dot')
        // Take in the prebuilt data, filtering the data to show only the ones that match the "_subset" input variable,
        // The filtering operation will be triggered whenever users select a region in the dropdown menu.
        .data(thisViz.data)
        .enter()
        .append("circle")
        .attr('class','dot')
        .attr("cx", d => thisViz.x(d.budget)+30)
        .attr("cy", d => thisViz.y(d.revenue))
        // .attr('fill', d => d.revenue > d.budget? '#90cea1' : '#5F1B23')
        .attr('fill', d => thisViz.colorScale(d.vote_average))
        .on("mouseover", (event,d)=>{
          thisViz.tipMouseOver(event,d);
        })
        .on("mouseout",(event,d)=>{
          thisViz.tipMouseOut();
        })
        .on("click",(event,d)=>{
          windowShield(true);
          createPopUp(d, 'scatterplot');
        })
        .attr('opacity',0.8)
        // Set the radius to be 0 first, later will initialize an animation to make it enlarge to 5 over a period of time.
        .attr("r", 0)
        .transition()
        .duration(500)
        .attr("r", d => thisViz.dotSize(Math.sqrt(d.popularity/20)+5));

    // Append Legend
    thisViz.svg.append("circle").attr("cx",thisViz.width/18).attr("cy",thisViz.height/50).attr("r", 5).style("fill", "#01b4e4").attr('class','legend-dot');
    thisViz.svg.append("circle").attr("cx",thisViz.width/18).attr("cy",thisViz.height/50+18).attr("r", 5).style("fill", "#ededed").attr('class','legend-dot');
    thisViz.svg.append("text").attr("x", thisViz.width/18+18).attr("y", thisViz.height/50).text("Highest Avg. User Score").style("font-size", ".8rem").attr("alignment-baseline","middle")
    thisViz.svg.append("text").attr("x", thisViz.width/18+18).attr("y", thisViz.height/50+18).text("Lowest Avg. User Score").style("font-size", ".8rem").attr("alignment-baseline","middle")
    thisViz.svg.append("text").attr("x", thisViz.width/18-5).attr("y", thisViz.height/50+38).text("( Dot size is based on populaity score )").style("font-size", ".7rem").style("font-style", "italic").attr("alignment-baseline","middle")



  }

  // Optional depends on the time, if ok then develop it.
  updateChart(updatedVal){

    let thisViz = this;
    // Initialize animation for the scatter plot every time the render method is been called
    thisViz.svg
        .selectAll('.dot')
        .transition()
        .duration(500)
        .attr("r", 0)

    thisViz.svg
        .select('.scatter-group')
        .transition()
        .duration(500)
        .remove();


    // Filter release year first
    thisViz.filteredData_ReleaseTime = thisViz.data.filter(d => d.release_yr >= Number(updatedVal.time[0]) && d.release_yr <= Number(updatedVal.time[1]));
    // Then Filter box office & genres info
    thisViz.filterData = thisViz.filteredData_ReleaseTime.filter((dataPt)=>{
      if(updatedVal.genre === 'All' && updatedVal.profitType === 'All'){
        // Default
        return true
      }else if (updatedVal.genre !== 'All' && updatedVal.profitType === 'All') {
        // Filter Genre Only
        for(let item of dataPt.genres){
          if(item.name.includes(updatedVal.genre)){
            return true
          }
        }
      }else if (updatedVal.genre === 'All' && updatedVal.profitType !== 'All'){
        // Filter Profit Only
        if (updatedVal.profitType === 'Earned') {
          return dataPt.revenue > dataPt.budget;
        }else if (updatedVal.profitType === 'Lost') {
          return dataPt.revenue < dataPt.budget;
        }
      }else{
        // Filter Both
        if (updatedVal.profitType === 'Earned'){
          for(let item of dataPt.genres){
            if(item.name.includes(updatedVal.genre) && dataPt.revenue > dataPt.budget){return true}
          }
        }else if (updatedVal.profitType === 'Lost') {
          for(let item of dataPt.genres){
            if(item.name.includes(updatedVal.genre) && dataPt.revenue < dataPt.budget){return true}
          }
        }
      }
    });
    // Sort the dots y popularity
    thisViz.filterData = thisViz.filterData.sort((a,b)=> a.popularity>b.popularity? -1:1);

    // Update axis and data rendering if the filtered data is more than 0
    if(thisViz.filterData.length > 0){

        thisViz.coordDomainData = {
          'budget' : [...thisViz.filterData.map((dataPt) => dataPt.budget)],
          'revenue' : [...thisViz.filterData.map((dataPt) => dataPt.revenue)],
          'revenue_per_budget' : [...thisViz.filterData.map((dataPt) => dataPt.revenue_per_budget)],
          'runtime' : [...thisViz.filterData.map((dataPt) => dataPt.runtime)],
          'popularity' : [...thisViz.filterData.map((dataPt) => dataPt.popularity)],
          'vote_average' : [...thisViz.filterData.map((dataPt) => dataPt.vote_average)]
        };

        thisViz.x = d3.scaleLinear()
                    // Define min & max value within the data we use to visualize
                    .domain([0, d3.max(thisViz.coordDomainData.budget)+d3.max(thisViz.coordDomainData.budget)*0.2])
                    .range([thisViz.margin.left,thisViz.width-thisViz.margin.right]);

        thisViz.y = d3.scaleLinear()
                    .domain([d3.max(thisViz.coordDomainData.revenue)+d3.max(thisViz.coordDomainData.revenue)*0.2, 0])
                    .range([thisViz.margin.top,thisViz.height-thisViz.margin.bottom]);


        this.colorScale = d3.scaleLinear()
                            .domain([d3.min(thisViz.coordDomainData.vote_average), d3.max(thisViz.coordDomainData.vote_average)])
                            .range(["#d5d5d5", "#01b4e4"]);


        thisViz.xAxis = this.svg
            .select('.axis-x')
            .transition().duration(900)
            .call(d3.axisBottom(thisViz.x).ticks(5).tickPadding([10]).tickFormat((d)=>{
              let textForm;

              (d / 1e6)/1000 >= 1 ?
              textForm = '$ ' + String(((d / 1e6)/1000).toFixed(1)) + 'B' :
              textForm = '$ ' + String((d / 1e6).toFixed(1)) + 'M'

              return textForm;
            }));

        thisViz.yAxis = this.svg
            .select('.axis-y')
            .transition().duration(900)
            .call(d3.axisLeft(thisViz.y).ticks(6).tickPadding([8]).tickFormat((d)=>{
              let textForm;

              (d / 1e6)/1000 >= 1 ?
              textForm = '$ ' + String(((d / 1e6)/1000).toFixed(1)) + 'B' :
              textForm = '$ ' + String((d / 1e6).toFixed(1)) + 'M'

              return textForm;
            }));


        thisViz.svg
              .append('g')
              // Append a g tag to group the scatterplot.
              .attr('class','scatter-group')
              .selectAll('.dot')
              // Take in the prebuilt data, filtering the data to show only the ones that match the "_subset" input variable,
              // The filtering operation will be triggered whenever users select a region in the dropdown menu.
              .data(thisViz.filterData)
              .enter()
              .append("circle")
              .attr('class','dot')
              .attr("cx", d => thisViz.x(d.budget)+30)
              .attr("cy", d => thisViz.y(d.revenue))
              .attr('fill', d => thisViz.colorScale(d.vote_average))
              .on("mouseover", (event,d)=>{
                thisViz.tipMouseOver(event,d);
              })
              .on("mouseout",(event,d)=>{
                thisViz.tipMouseOut();
              })
              .on("click",(event,d)=>{
                windowShield(true);
                createPopUp(d, 'scatterplot');
              })
              .attr('opacity',0.8)
              // Set the radius to be 0 first, later will initialize an animation to make it enlarge to 5 over a period of time.
              .attr("r", 0)
              .transition()
              .duration(700)
              .attr("r", d => thisViz.dotSize(Math.sqrt(d.popularity/20)+5));
    }

  }
}
// Define a horizontal bar chart object
class HorizontalBarChart {
  constructor(containerId, data,dataNum, topNum, width, height){

    let thisViz = this;
    // Set retrieved amount of the top ranked data
    this.topNum = topNum;

    this.sortKey = 'popularity';
    thisViz.originalData = data;
    thisViz.data = [];
    this.dataSortedAll = data.sort((prev,now)=>{
      let order;
      prev[this.sortKey] > now[this.sortKey]? order = -1 : order = 1;
      return order
    });

    if(this.dataSortedAll.length >= this.topNum){
      this.dataNum = [...Array(this.topNum).keys()];
    }else{
      this.dataNum = [...Array(this.dataSortedAll.length).keys()];
    }

    for (let index of this.dataNum) {
      thisViz.data.push(thisViz.dataSortedAll[index]);
    }


    // Define a 2-d array to store revenue&budget data to calculate min max value for coordinate system (x: budget, y: revenue)

    this.coordDomainData = {
      'metrics' : [...thisViz.data.map((dataPt) => dataPt[thisViz.sortKey])],
      'movieName' : [...thisViz.data.map((dataPt) => dataPt.original_title +' ('+dataPt.release_date.slice(0,4)+')')]
    };

    // These variables are used to define size of the visualization canvas and the
    // margin (or "padding") around the scattter plot.  We use the margin to draw
    // things like axis labels.
    this.containerId = containerId;
    this.height = height;
    this.width = width;
    this.margin = {
      top:30,
      right:10,
      left:100,
      bottom: 100
    };

    // Define a variety of scales, for color, x axis and y axis.
    this.x = d3.scaleLinear()
                // Define min & max value within the data we use to visualize
                .domain([0, d3.max(this.coordDomainData['metrics'])+d3.max(this.coordDomainData['metrics'])*0.1])
                .range([this.margin.left, this.width-this.margin.right]);

    this.y = d3.scaleBand()
                .domain(this.coordDomainData.movieName)
                .range([this.margin.top,this.height-this.margin.bottom])
                .padding(.1);

    // Create the SVG canvas that will be used to render the visualization.
    this.svg = d3.select("#"+this.containerId)
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);

    // Add axes.  First the X axis and label.
    this.xAxis = this.svg.append("g")
        .attr("class", "bar-axis-x")
        .attr("transform", "translate(30,"+(this.height-this.margin.bottom)+")")
        .call(d3.axisBottom(this.x).ticks(6).tickPadding([15]).tickFormat((d)=>{

          if(this.sortKey === 'revenue' || this.sortKey === 'budget'){
            let textForm;
            (d / 1e6)/1000 >= 1 ?
            textForm = '$ ' + String(((d / 1e6)/1000).toFixed(1)) + 'B' :
            textForm = '$ ' + String((d / 1e6).toFixed(1)) + 'M'

            return textForm;
          }else if (this.sortKey === 'revenue_per_budget') {
            return "$ "+String(d.toFixed(1));
          }else if(this.sortKey === 'vote_average'){
            return String(d*10)+"%";
          }else if(this.sortKey === 'runtime'){
            runTimeParsing(d);
          }else if(this.sortKey === 'popularity'){
            return String(d.toFixed(1));
          }

        }));

    this.svg.append("text")
        .attr("class", "axis-label bar-text")
        .attr("y", this.height-this.margin.bottom/2.5)
        .attr("x",0 + (this.width / 1.8))
        .style("text-anchor", "middle")
        .text(()=>{
          if(this.sortKey === 'revenue'){
            return 'Revenue';
          }else if (this.sortKey === 'budget') {
            return 'Budget';
          }else if (this.sortKey === 'revenue_per_budget') {
            return 'Revenue / Budget';
          }else if(this.sortKey === 'vote_average'){
            return 'Avg. User Score';
          }else if(this.sortKey === 'runtime'){
            return 'Film Length';
          }else{
            return 'Popularity';
          }
        });

    // Now the Y axis and label.
    this.yAxis = this.svg.append("g")
        .attr("class", "horizontal-bar-axis-y")
        .attr("transform", "translate("+String(this.margin.left+30)+",0)")
        .call(d3.axisLeft(this.y).tickFormat((d)=>{
          // Show only partial text on y-axis
          if (d.length > 15) {
            return (d.substring(0, 15) + "...");
          }else{
            return d;
          }

        }));
  }
  render(){
      //Bars
      let thisViz = this;

      let tooltip = d3.select(".tooltip");

      // tooltip mouseover event handler
      thisViz.tipMouseOver = (event, d) => {

          // Latest D3 version (v6 onward) does not recognize d3.event.pageX & d3.event.pageY
          // It changes to d3.pointer(event, taget_container) where 2 position values (x, y) of the mouse position are returned.
          // 2nd argument is used to calculate the relative location of the tooltip so it can scale upon when the vessel's width and height change.

          let[x, y] = d3.pointer(event, thisViz.svg),
          barLabel,
          barText;

          if(this.sortKey === 'revenue'){
            barLabel = 'Revenue';

            (d[this.sortKey] / 1e6)/1000 >= 1 ?
            barText = '$ ' + String(((d[this.sortKey] / 1e6)/1000).toFixed(2)) + ' Billion' :
            (d[this.sortKey] / 1e6)?
            barText = '$ ' + String((d[this.sortKey] / 1e6).toFixed(2)) + ' Million':
            barText = '$ ' + String((d[this.sortKey]).toFixed(2));

          }else if (this.sortKey === 'budget') {
            barLabel = 'Budget';

            (d[this.sortKey] / 1e6)/1000 >= 1 ?
            barText = '$ ' + String(((d[this.sortKey] / 1e6)/1000).toFixed(2)) + ' Billion' :
            (d[this.sortKey] / 1e6)?
            barText = '$ ' + String((d[this.sortKey] / 1e6).toFixed(2)) + ' Million':
            barText = '$ ' + String((d[this.sortKey]).toFixed(2));

          }else if (this.sortKey === 'revenue_per_budget') {
            barLabel = 'Revenue / Budget';

            barText = "$ "+String(d[this.sortKey].toFixed(2));

          }else if(this.sortKey === 'vote_average'){
            barLabel = 'Avg. User Score';
            barText = String(Math.floor(d[this.sortKey]*1000)/100)+"%";

          }else if(this.sortKey === 'runtime'){
            barLabel = 'Film Length';
            barText=runTimeParsing(d);
          }else if(this.sortKey === 'popularity'){
            barLabel = 'Popularity Score';
            barText= d[this.sortKey];
          }


          let htmlChild  = `<h1 class= 'tooltip-title'>${d.original_title + " ("+d.release_date.slice(0,4)+")"}</h1>
                      <p class='tooltip-sub-title bar-text'> ${barLabel} : <br><b><span class = 'bar-tooltip-text'>${barText}</span></b></p>`;

          tooltip.html(htmlChild)
          .style("left", `${String(x+20)}` + "px")
          .style("top", `${String(y/1.1)}` + "px")
          .transition()
          .duration(200) // ms
          .style("opacity", .9)
          .style("display",'inline-block');

      };
      // tooltip mouseout event handler
      thisViz.tipMouseOut = () => {
        d3.selectAll(".tooltip")
              .transition()
              .duration(200) // ms
              .style("opacity", 0)
              .style("display",'none');
      };

      let bar = thisViz.svg.selectAll("rect")
        .data(thisViz.data)
        .join("rect")
        .attr("x", thisViz.x(0)+30.5)
        .attr("y", d => thisViz.y(d.original_title+' ('+d.release_date.slice(0,4)+')'))
        .attr('class','bar')
        .attr("height", thisViz.y.bandwidth())
        .attr("width",0)
        .on("mouseover", (event,d)=>{
          thisViz.tipMouseOver(event,d);
        })
        .on("mouseout",(event,d)=>{
          thisViz.tipMouseOut();
        })
        .on("click",(event,d)=>{
          windowShield(true);
          createPopUp(d, 'scatterplot');
        })
        .transition()
        .ease(d3.easeBounce)
        .delay((d,i) => {return i*75})
        .duration(500)
        .attr("width", d => thisViz.x(d[thisViz.sortKey])-thisViz.margin.left-1);

  }
  updateChart(updatedVal,sortKey=''){
    let thisViz = this


    if(sortKey !== ''){
      thisViz.sortKey = sortKey;
    }

    // Filter release year first
    if(updatedVal.time[0]==='NA'||updatedVal.time[1]==='NA'){
      let startTime = document.getElementById('start_time').value,
      endTime = document.getElementById('end_time').value;
      updatedVal.time = [Number(startTime),Number(endTime)];
    }

    thisViz.filteredData_ReleaseTime = thisViz.originalData.filter(d => d.release_yr >= Number(updatedVal.time[0]) && d.release_yr <= Number(updatedVal.time[1]));

    thisViz.dataSortedAll = thisViz.filteredData_ReleaseTime.sort((prev,now)=>{
      let order;
      prev[thisViz.sortKey] > now[thisViz.sortKey]? order = -1 : order = 1;
      return order
    });

    // Filter data
    thisViz.filteredData = [];

    thisViz.filteredDataSorted = thisViz.filteredData_ReleaseTime.filter((dataPt)=>{
      if(updatedVal.genre === 'All' && updatedVal.profitType === 'All'){
        // Default
        return true
      }else if (updatedVal.genre !== 'All' && updatedVal.profitType === 'All') {
        // Filter Genre Only
        for(let item of dataPt.genres){
          if(item.name.includes(updatedVal.genre)){
            return true
          }
        }
      }else if (updatedVal.genre === 'All' && updatedVal.profitType !== 'All'){
        // Filter Profit Only
        if (updatedVal.profitType === 'Earned') {
          return dataPt.revenue > dataPt.budget;
        }else if (updatedVal.profitType === 'Lost') {
          return dataPt.revenue < dataPt.budget;
        }
      }else{
        // Filter Both
        if (updatedVal.profitType === 'Earned'){
          for(let item of dataPt.genres){
            if(item.name.includes(updatedVal.genre) && dataPt.revenue > dataPt.budget){return true}
          }
        }else if (updatedVal.profitType === 'Lost') {
          for(let item of dataPt.genres){
            if(item.name.includes(updatedVal.genre) && dataPt.revenue < dataPt.budget){return true}
          }
        }
      }
    });

    // Set retrieved amount of the top ranked data
    if(thisViz.filteredDataSorted.length>=thisViz.topNum){
      thisViz.dataNum = [...Array(thisViz.topNum).keys()];
    }else{
      thisViz.dataNum = [...Array(thisViz.filteredDataSorted.length).keys()];
    }



    for (let index of this.dataNum) {
      thisViz.filteredData.push(thisViz.filteredDataSorted[index]);
    }

    // Define a 2-d array to store revenue&budget data to calculate min max value for coordinate system (x: budget, y: revenue)

    this.coordDomainData = {
      'metrics' : [...thisViz.filteredData.map((dataPt) => dataPt[thisViz.sortKey])],
      'movieName' : [...thisViz.filteredData.map((dataPt) => dataPt.original_title +' ('+dataPt.release_date.slice(0,4)+')')]
    };



    // Define a variety of scales, for color, x axis and y axis.
    this.x = d3.scaleLinear()
                // Define min & max value within the data we use to visualize
                .domain([0, d3.max(thisViz.coordDomainData['metrics'])+d3.max(thisViz.coordDomainData['metrics'])*0.1])
                .range([thisViz.margin.left, thisViz.width-thisViz.margin.right]);

    this.y = d3.scaleBand()
                .domain(thisViz.coordDomainData.movieName)
                .range([thisViz.margin.top,thisViz.height-thisViz.margin.bottom])
                .padding(.1);

    // Add axes.  First the X axis and label.
    this.xAxis = this.svg.select(".bar-axis-x")
        .transition().duration(900)
        .attr("transform", "translate(30,"+(this.height-this.margin.bottom)+")")
        .call(d3.axisBottom(this.x).ticks(6).tickPadding([15]).tickFormat((d)=>{

          if(this.sortKey === 'revenue' || this.sortKey === 'budget'){
            let textForm;
            (d / 1e6)/1000 >= 1 ?
            textForm = '$ ' + String(((d / 1e6)/1000).toFixed(1)) + 'B' :
            textForm = '$ ' + String((d / 1e6).toFixed(1)) + 'M'

            return textForm;
          }else if (this.sortKey === 'revenue_per_budget') {
            return "$ "+String(d.toFixed(1));
          }else if(this.sortKey === 'vote_average'){
            return String(d*10)+"%";
          }else if(this.sortKey === 'runtime'){

            let time = String(parseInt(d/60))+"h"+" "+String(d%60)+"m";
            return time
          }else if(this.sortKey === 'popularity'){
            return String(d.toFixed(1));
          }

        }));

    this.svg.select("text.axis-label")
    .text(()=>{
      if(this.sortKey === 'revenue'){
        return 'Revenue';
      }else if (this.sortKey === 'budget') {
        return 'Budget';
      }else if (this.sortKey === 'revenue_per_budget') {
        return 'Revenue / Budget';
      }else if(this.sortKey === 'vote_average'){
        return 'Avg. User Score';
      }else if(this.sortKey === 'runtime'){
        return 'Film Length';
      }else{
        return 'Popularity';
      }
    });

    // Now the Y axis and label.
    this.yAxis = this.svg.select(".horizontal-bar-axis-y")
        .transition().duration(900)
        .attr("transform", "translate("+String(this.margin.left+30)+",0)")
        .call(d3.axisLeft(this.y).tickFormat((d)=>{
          // Show only partial text on y-axis
          if (d.length > 15) {
            return (d.substring(0, 15) + "...");
          }else{
            return d;
          }
        }));

    // Destroy all bar chart and remake them all over again
    thisViz.svg.selectAll("rect").remove();

      let bar = thisViz.svg.selectAll("rect")
        .data(thisViz.filteredData)
        .join("rect")
        .attr("x", thisViz.x(0)+30.5)
        .attr("y", d => thisViz.y(d.original_title+' ('+d.release_date.slice(0,4)+')'))
        .attr('class','bar')
        .attr("height", thisViz.y.bandwidth())
        .attr("width",0)
        .on("mouseover", (event,d)=>{
          thisViz.tipMouseOver(event,d);
        })
        .on("mouseout",(event,d)=>{
          thisViz.tipMouseOut();
        })
        .on("click",(event,d)=>{
          windowShield(true);
          createPopUp(d, 'scatterplot');
        })
        .transition()
        .ease(d3.easeBounce)
        .delay((d,i) => {return i*50})
        .duration(500)
        .attr("width", d => thisViz.x(d[this.sortKey])-thisViz.margin.left-1);
  }
}
// Define a horizontal bar chart object
class VerticalBarChart {
  constructor(containerId, data, width, height){
    let thisViz = this;
    let dataIndex = 1;
    // Set retrieved amount of the top ranked data
    this.originalData = data;
    // First store the movie data based on release date in descending order - new ~ old (this is for the purpose of retrieving the latest 50 movies)
    // Set a new key as an unique id for each movie (This will be used to the bar visualization later)
    this.originalData.map(d => {
      d.unique_name = d.original_title + '_' + d.release_date
    })
    // Filter and show the default data based on 3 conditions (1. user score > 0 / 2. release date is not null / 3. working type match the best_known strength show on the profile section)
    this.filteredDataAllDepartment = [...this.originalData.filter(d => Number(d.vote_average)>0 && d.release_date)];
    this.filteredData = [...this.filteredDataAllDepartment.filter(d => d.department === document.getElementsByClassName('strength-text')[0].innerText)];

    this.filteredData.sort((previous, present) => (new Date(previous.release_date) > new Date(present.release_date)) ? -1 : 1);
    // Return only the top 50 films and stored in key "plottedData" for data viz
    if(this.filteredData.length >= 50){
      this.plottedData = [...this.filteredData].slice(0,50);
    }else{
      this.plottedData = [...this.filteredData];
    }


    this.plottedData.sort((previous, present) => (new Date(previous.release_date) > new Date(present.release_date)) ? 1 : -1)
    this.plottedData.map(d=>{
      d.unique_name = String(dataIndex)+'.'+d.unique_name;
      dataIndex++;
    })

    this.coordDomainData = {
      'metrics' : [...thisViz.plottedData.map((dataPt) => dataPt.vote_average)],
      'unique_name' : [...thisViz.plottedData.map((dataPt) => dataPt.unique_name)]
    };
    // Add 1 dummy var so the last bar won't be cut off
    // this.coordDomainData.unique_name.push('');
    // this.coordDomainData.metrics.push(0);

    this.containerId = containerId;
    this.height = height;
    this.width = width;
    this.margin = {
      top:40,
      right:40,
      left:60,
      bottom: 50
    };

    this.svg = d3.select("#"+this.containerId)
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);

    // Parsing date data in JS: new Date(data_name)
    // Get Year -> new Date(data).getYear()+1900
    // Get Month -> new Date(data).getMonth()+1

    // Define a variety of scales, for color, x axis and y axis.
    this.y = d3.scaleLinear()
                // Define min & max value within the data we use to visualize
                .domain([0, 10])
                .range([this.height-this.margin.bottom, this.margin.top]);

    this.x = d3.scaleBand()
                .domain(this.coordDomainData.unique_name)
                .range([this.margin.left, this.width-this.margin.right])
                .padding(.1);

    // Add axes.  First the X axis and label.
    this.xAxis = this.svg.append("g")
        .attr("class", "bar-axis-x")
        .attr("transform", "translate(30,"+(this.height-this.margin.bottom)+")")
        .call(d3.axisBottom(this.x).tickPadding([15]).tickFormat((d)=>{
          if (Number(d.slice(0,d.indexOf('.'))) === thisViz.plottedData.length || Number(d.slice(0,d.indexOf('.'))) === 1) {
            return d.slice(d.indexOf('_')+1,d.indexOf('_')+8)
          }else{
            return
          }
        }));

    this.svg.append("text")
        .attr("class", "axis-label bar-text")
        .attr("y", this.height-5)
        .attr("x",0 + (this.width / 1.9))
        .style("text-anchor", "middle")
        .text('Time');

    // Now the Y axis and label.
    this.yAxis = this.svg.append("g")
        .attr("class", "bar-axis-y")
        .attr("transform", "translate("+String(this.margin.left+30)+",0)")
        .call(d3.axisLeft(this.y).tickFormat((d)=>{
          return String(d*10)+"%";
        }));

    this.svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("class", "axis-label")
        .attr("y", -25)
        .attr("x",0 + (this.height / 2))
        .style("text-anchor", "middle")
        .text("User Score");

  }
  render(){
    //Bars
    let thisViz = this;
    let tooltip = d3.select(".tooltip.collaboration");

    thisViz.colors = {
      "Crew":'#848ee8',
      "Directing":'#8e0517',
      "Costume & Make-Up":'#591E46',
      "Actors": '#CC6695',
      "Art": '#A7A238',
      "Writing": '#edc30b',
      "Lighting":'#4546C1',
      "Sound":'#141E3C',
      "Editing":'#210b68',
      "Visual Effects":'#957FD4',
      "Production":'#23694D',
      "Camera":'#513E1B',
      "Acting": '#002b75'
    }
    // tooltip mouseover event handler
    thisViz.tipMouseOver = (event, d) => {

        // Latest D3 version (v6 onward) does not recognize d3.event.pageX & d3.event.pageY
        // It changes to d3.pointer(event, taget_container) where 2 position values (x, y) of the mouse position are returned.
        // 2nd argument is used to calculate the relative location of the tooltip so it can scale upon when the vessel's width and height change.


        let[x, y] = d3.pointer(event, thisViz.svg);
        let imgSrc = (d)=>{
          if(d.poster_path){
            return `<img src= https://image.tmdb.org/t/p/original${d.poster_path}
            alt="movie star's profile picture" id="${d.id}" class='collaboration-poster'>`;
          }else{
            return '';
          }
        }

        let job = (d) => {
          if (d.creditType==='cast') {
            return `<p class= 'tooltip-sub-title collaboration'>Acting Role : <span class = 'collaboration-text'>${d.character}</span></p>`
          }else{
            return `<p class= 'tooltip-sub-title collaboration'>Work as : <span class = 'collaboration-text'>${d.job}</span></p>`
          }
        }

        let htmlChild  = `
                    <h1 class= 'tooltip-title collaboration'>${d.original_title}</h1>
                    <p class= 'tooltip-sub-title collaboration'>Date : <span class = 'collaboration-text'>${d.release_date}</span></p>
                    ${imgSrc(d)}
                    <p class= 'tooltip-sub-title collaboration'>Work Type : <span class = 'collaboration-text'>${d.department}</span></p>
                      ${job(d)}
                    <hr>
                    <p class= 'tooltip-sub-title collaboration data'>User Score : <span class = 'collaboration-text highlight'>${String(Math.floor(d.vote_average*1000)/100)+"%"}</span></p>
                    <p class= 'tooltip-sub-title collaboration data'>Score Counts per Film : <span class = 'collaboration-text highlight'>${String(d.vote_count)}</span></p>`;

        tooltip.html(htmlChild)
        .style("left", `${String(x-100)}` + "px")
        .style("top", `${String(y-550)}` + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", .95)
        .style("display",'inline-block');

    };
    // tooltip mouseout event handler
    thisViz.tipMouseOut = () => {
      d3.selectAll(".tooltip.collaboration")
            .transition()
            .duration(200) // ms
            .style("opacity", 0)
            .style("display",'none');
    };

    // Check How many Genre the star has participated in
    this.totalGenre = [];
    this.totalDepartment= [];
    for(let d of this.filteredDataAllDepartment){
      d['genres'] = []
      for(let genreId of d.genre_ids){
        d.genres.push({'name':tmdbGenresList.filter(d => d.id === genreId)[0].name});
        this.totalGenre.push(tmdbGenresList.filter(d => d.id === genreId)[0].name);
      }
      this.totalDepartment.push(d.department);
    }
    this.totalGenre = [...new Set(this.totalGenre)];
    this.totalDepartment = [...new Set(this.totalDepartment)];



    // Create filter group
    let genreOptionHolder = document.getElementById('genre_filter_movie_bar'),
    departmentOptionHolder = document.getElementById('department_filter_movie_bar');

    for(let genre of this.totalGenre){
      let option = document.createElement('option');
      option.value = genre;
      option.innerText = genre;
      genreOptionHolder.appendChild(option);
    }
    for(let department of this.totalDepartment){
      let option = document.createElement('option');
      option.value = department;
      option.innerText = department;
      departmentOptionHolder.appendChild(option);
    }
    genreOptionHolder.addEventListener('change',(event)=>{
      // Update barchart
      let updatedVal = {
        'genre': event.target.value,
        'department': departmentOptionHolder.value
      }
      // thisViz.updateChart(updatedVal);
      thisViz.updateChart(updatedVal);
    });
    departmentOptionHolder.addEventListener('change',(event)=>{
      let updatedVal = {
        'genre': genreOptionHolder.value,
        'department': event.target.value
      }
      // thisViz.updateChart(updatedVal);
      thisViz.updateChart(updatedVal);
    });


    departmentOptionHolder.value = document.getElementsByClassName('strength-text')[0].innerText;


    thisViz.svg.selectAll(".bar")
      .data(thisViz.plottedData)
      .enter()
      .append('rect')
      .attr("x", d => thisViz.x(d.unique_name)+30)
      .attr("y", d => thisViz.y(0))
      .attr('class','people-movie-bar')
      .attr("width",thisViz.x.bandwidth())
      .attr("height", d => thisViz.height - thisViz.y(0) - thisViz.margin.bottom)
      .on("mouseover", (event,d)=>{
        thisViz.tipMouseOver(event,d);
      })
      .on("mouseout",(event,d)=>{
        thisViz.tipMouseOut();
      })
      .on("click",(event,d)=>{
        windowShield(true);
        createPopUp(d, 'scatterplot');
      })
      .attr('fill', d => thisViz.colors[d.department])
      .transition()
      .ease(d3.easeBounce)
      .duration(300)
      .delay((d,i) => {return i*45})
      .attr("y", d => thisViz.y(d.vote_average))
      .attr("height", d => thisViz.height - thisViz.y(d.vote_average) - thisViz.margin.bottom)


      // Calculate the career avg of user score
      this.careerUserScore = 0;
      this.totalVoteCount = 0;
      // Get only the unique set of films for calculations
      thisViz.filteredData = [...new Map(thisViz.filteredData.map(film =>[film['id'], film])).values()];

      for(let d of thisViz.filteredData){
        this.careerUserScore += d.vote_average*d.vote_count
        this.totalVoteCount += d.vote_count
      }

      this.careerUserScore /= this.totalVoteCount;
      this.careerUserScoreTxt = String((this.careerUserScore*10).toFixed(1))+"%";

    // Add a benchmark line represents the career average user score received
    thisViz.svg
        .append('line')
        .style("stroke", "darkred")
        .style("stroke-width", 2)
        .style("stroke-dasharray", ("3, 3"))
        .attr('id', 'benchmark-line')
        .attr("x1", this.margin.left+30)
        .attr("y1", thisViz.y(this.careerUserScore))
        .attr("x2", this.width-this.margin.right+30)
        .attr("y2", thisViz.y(this.careerUserScore));

    // Add a benchmark line text
    document.getElementById('benchmark-text').innerText = thisViz.careerUserScoreTxt;

  }
  updateChart(updatedVal){

    let thisViz = this;
    let dataIndex = 1;
    this.filteredDataNew;
    this.filteredDataNew = [...this.originalData.filter(d => (d.vote_average>0) && (d.release_date))];

    // Filter data
    this.filteredDataNew = [...this.filteredDataNew.filter((dataPt)=>{
      if(updatedVal.genre === 'All' && updatedVal.department === 'All'){
        // Default
        return true
      }else if (updatedVal.genre !== 'All' && updatedVal.department === 'All') {
        // Filter Genre Only
        for(let item of dataPt.genres){
          if(item.name.includes(updatedVal.genre)){
            return true
          }
        }
      }else if (updatedVal.genre === 'All' && updatedVal.department !== 'All'){
        // Filter department
        return dataPt.department === updatedVal.department;
      }else{
        // Filter Both
        if (dataPt.department === updatedVal.department){
          for(let item of dataPt.genres){
            if(item.name.includes(updatedVal.genre)){
              return true
            }
          }
        }
      }
    })];


    this.filteredDataNew.sort((previous, present) => (new Date(previous.release_date) > new Date(present.release_date)) ? -1 : 1);

    if(this.filteredDataNew.length >= 50){
      this.plottedDataNew = [...this.filteredDataNew].slice(0,50);
    }else{
      this.plottedDataNew = [...this.filteredDataNew];
    }

    this.plottedDataNew.sort((previous, present) => (new Date(previous.release_date) > new Date(present.release_date)) ? 1 : -1);
    this.plottedDataNew.map(d=>{
      d.unique_name = String(dataIndex)+'.'+d.unique_name;
      dataIndex++;
    })

    this.coordDomainData = {
      'metrics' : [...thisViz.plottedDataNew.map((dataPt) => dataPt.vote_average)],
      'unique_name' : [...thisViz.plottedDataNew.map((dataPt) => dataPt.unique_name)]
    };

    // Parsing date data in JS: new Date(data_name)
    // Get Year -> new Date(data).getYear()+1900
    // Get Month -> new Date(data).getMonth()+1

    this.x = d3.scaleBand()
                .domain(this.coordDomainData.unique_name)
                .range([this.margin.left, this.width-this.margin.right])
                .padding(.1);

    // Add axes.  First the X axis and label.
    this.xAxis = this.svg.select(".bar-axis-x")
        .attr("transform", "translate(30,"+(this.height-this.margin.bottom)+")")
        .call(d3.axisBottom(this.x).tickPadding([15]).tickFormat((d)=>{
          if (Number(d.slice(0,d.indexOf('.'))) === thisViz.plottedDataNew.length || Number(d.slice(0,d.indexOf('.'))) === 1) {
            return d.slice(d.indexOf('_')+1,d.indexOf('_')+8)
          }else{
            return
          }
        }));

    // Destroy all bar chart and remake them all over again
    this.svg.selectAll("rect").remove();

    // Calculate the career avg of user score
    // Get only the unique set of films for calculations
    thisViz.filteredDataNew = [...new Map(thisViz.filteredDataNew.map(film =>[film['id'], film])).values()];

    if(thisViz.filteredDataNew.length <= 0){
      this.careerUserScore = 10000;
      this.careerUserScoreTxt = "0%";

    }else{
      this.careerUserScore = 0;
      this.totalVoteCount = 0
      for(let d of thisViz.filteredDataNew){
        this.careerUserScore += d.vote_average*d.vote_count
        this.totalVoteCount += d.vote_count
      }
      this.careerUserScore /= this.totalVoteCount;
      this.careerUserScoreTxt = String((this.careerUserScore*10).toFixed(1))+"%";
    }

    this.svg.selectAll(".bar")
      .data(thisViz.plottedDataNew)
      .join('rect')
      .attr("x", d => thisViz.x(d.unique_name)+30)
      .attr("y", d => thisViz.y(0))
      .attr('class','people-movie-bar')
      .attr("width",thisViz.x.bandwidth())
      .attr("height", d => thisViz.height - thisViz.y(0) - thisViz.margin.bottom)
      .on("mouseover", (event,d)=>{
        thisViz.tipMouseOver(event,d);
      })
      .on("mouseout",(event,d)=>{
        thisViz.tipMouseOut();
      })
      .on("click",(event,d)=>{
        windowShield(true);
        createPopUp(d, 'scatterplot');
      })
      .attr('fill', d => thisViz.colors[d.department])
      .transition()
      .ease(d3.easeBounce)
      .duration(300)
      .delay((d,i) => {return i*45})
      .attr("y", d => thisViz.y(d.vote_average))
      .attr("height", d => thisViz.height - thisViz.y(d.vote_average) - thisViz.margin.bottom)

    thisViz.svg
        .select('#benchmark-line')
        .style("stroke", "darkred")
        .style("stroke-width", 2)
        .style("stroke-dasharray", ("3, 3"))
        .transition()
        .ease(d3.easeBounce)
        .duration(800)
        .attr("x1", this.margin.left+30)
        .attr("y1", thisViz.y(this.careerUserScore))
        .attr("x2", this.width-this.margin.right+30)
        .attr("y2", thisViz.y(this.careerUserScore));

    document.getElementById('benchmark-text').innerText = thisViz.careerUserScoreTxt;
  }
}
// Define a network chart object
class NetworkChart {
  constructor(containerId, data, width, height){
    let thisViz = this;
    this.data = data;
    this.networkData = {
      'nodes':[{
        'id':1,
        'data': document.getElementsByClassName('cast-name')[0].innerText
      }],
      'links':[]
    }

    // Build out network data
    for(let i = 0; i < data.length; i++){
      this.networkData.nodes.push({
        'id':i+2,
        'data': data[i].colabMovie
      });
      this.networkData.links.push({
        'source':1,
        'target': i+2
      });
    }

    this.containerId = containerId;

    // These variables are used to define size of the visualization canvas and the
    // margin (or "padding") around the scattter plot.  We use the margin to draw
    // things like axis labels.
    this.containerId = containerId;
    this.width = width;
    this.height = height;
    this.margin = {
      top:10,
      right:10,
      left:10,
      bottom: 10
    };

    // Create the SVG canvas that will be used to render the visualization.
    this.svg = d3.select("#"+this.containerId)
                .append("svg")
                .attr('class','network-svg')
                .attr("width", width + thisViz.margin.left + thisViz.margin.right)
                .attr("height", height + thisViz.margin.top + thisViz.margin.bottom)


    this.svg.append("g")
                .attr("transform",`translate(${thisViz.margin.left}, ${thisViz.margin.top})`);

  }
  render(){
    let thisViz = this;
    let tooltip = d3.select(".tooltip.collaboration");

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    this.ticked = () => {
      thisViz.link.attr("x1", d => d.source.x)
                  .attr("y1", d => d.source.y)
                  .attr("x2", d => d.target.x)
                  .attr("y2", d => d.target.y);

      thisViz.node.attr("cx", d => d.x)
                  .attr("cy", d => d.y);

      thisViz.text.attr("x", d => d.x-33) //position of the lower left point of the text
                  .attr("y", d => d.y+33); //position of the lower left point of the text
    }

    // tooltip
    // tooltip mouseover event handler
    thisViz.tipMouseOver = (event, d) => {

        // Latest D3 version (v6 onward) does not recognize d3.event.pageX & d3.event.pageY
        // It changes to d3.pointer(event, taget_container) where 2 position values (x, y) of the mouse position are returned.
        // 2nd argument is used to calculate the relative location of the tooltip so it can scale upon when the vessel's width and height change.

        if(d.id === 1){
          return;
        }

        let[x, y] = d3.pointer(event, thisViz.svg);
        let imgSrc = (d)=>{
          if(d.data[0].profile_path){
            return `<img src= https://image.tmdb.org/t/p/original${d.data[0].profile_path}
            alt="movie star's profile picture" id="${d.data[0].id}" class='collaboration-poster'>`;
          }else{
            return '';
          }
        }
        let htmlChild  = `<h1 class= 'tooltip-title collaboration'>${d.data[0].original_name}</h1>
                    <p class= 'tooltip-sub-title collaboration'>( Best Known for <span class = 'collaboration-text'>${d.data[0].known_for_department}</span> )</p>
                    ${imgSrc(d)}
                    <p class='tooltip-sub-title collaboration'>Frequency : <span class = 'collaboration-text'>${d.data.length}</span> times</p>`;

        // `${x+250 > thisViz.width ? String(x-(x+250-thisViz.width)):String(x+10)}`
        // `${y+400 > thisViz.height ? String(y-(y+400-thisViz.height)):String(y+20)}`
        //                     `<img src='https://image.tmdb.org/t/p/original${d.poster_path}' alt="tooltip movie poster" id="tooltip-poster"><br/>`

        tooltip.html(htmlChild)
        .style("left", `${String(x-230)}` + "px")
        .style("top", `${String(y/1.4)}` + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", .95)
        .style("display",'inline-block');

    };
    // tooltip mouseout event handler
    thisViz.tipMouseOut = () => {
      d3.selectAll(".tooltip.collaboration")
            .transition()
            .duration(200) // ms
            .style("opacity", 0)
            .style("display",'none');
    };

    thisViz.colorScale = d3.scaleLinear()
                            .domain([this.networkData.nodes[15].data.length, this.networkData.nodes[1].data.length])
                            .range(["#8196b8", "#0046b8"])

    // Initialize the links
    this.link = this.svg
                    .selectAll("line")
                    .data(thisViz.networkData.links)
                    .enter()
                    .append("line")
                    .style("stroke", "#aaa");

    // Initialize the nodes
    this.node = this.svg.append('g')
                    .attr('class','nodes')
                    .selectAll("circle")
                    .data(thisViz.networkData.nodes)
                    .enter()
                    .append("circle")
                    .attr('id', (d)=>{
                      if (d.id===1) {
                        return 'node-circle-core'
                      }else{
                        return 'node-circle'
                      }
                    })
                    .attr("r", d =>{
                      if (d.id === 1) {
                        return 10;
                      }else{
                        if(document.body.clientWidth>=1920){
                          return 27;
                        }else{
                          return 23;
                        }
                      }
                    })
                    .on("mouseover", (event,d)=>{
                      thisViz.tipMouseOver(event,d);
                    })
                    .on("mouseout",(event,d)=>{
                      thisViz.tipMouseOut();
                    })
                    .on("click",(event,d)=>{
                      // createPopUp()
                      window.location.hash = `#person_id=${d.data[0].id}`;
                    })
                    .style("fill", (d)=>{
                      if(d.id === 1){
                        return '#bbb';
                      }else{
                        return thisViz.colorScale(d.data.length);
                      }
                    })
                    .call(d3.drag()  //sets the event listener for the specified typenames and returns the drag behavior.
                        .on("start", (event, d) =>thisViz.dragstarted(event, d)) //start - after a new pointer becomes active (on mousedown or touchstart).
                        .on("drag", (event, d) =>thisViz.dragged(event, d))      //drag - after an active pointer moves (on mousemove or touchmove).
                        .on("end", (event, d) =>thisViz.dragended(event, d))     //end - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
                     );

    this.text = this.svg.append("g")
                         .attr("class", "nodes-text")
                         .selectAll("text")
                         .data(thisViz.networkData.nodes)
                         .enter()
                         .append("text")
                         .text(d => {
                           if (d.id === 1) {
                             return '';
                           }else{
                             return d.data[0].original_name;
                           }
                         })

    // Define the netowrk nodes and edges' looseness based on device width
    if(document.body.clientWidth>=1920){
      this.simulation = d3.forceSimulation()                 // Force algorithm is applied to data.nodes
                          .force("link",
                            d3.forceLink()                               // This force provides links between nodes
                              .id(d => d.id)                     // This provide  the id of a node                                // and this the list of links
                          )
                          .force("charge", d3.forceManyBody().strength(-4000))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                          .force("center", d3.forceCenter(thisViz.width / 2, thisViz.height / 2))     // This force attracts nodes to the center of the svg area
    }else if(document.body.clientWidth>=1560){
      this.simulation = d3.forceSimulation()
                          .force("link",
                            d3.forceLink()
                              .id(d => d.id)
                          )
                          .force("charge", d3.forceManyBody().strength(-2500))
                          .force("center", d3.forceCenter(thisViz.width / 2, thisViz.height / 2))
    }else{
      this.simulation = d3.forceSimulation()
                          .force("link",
                            d3.forceLink()
                              .id(d => d.id)
                          )
                          .force("charge", d3.forceManyBody().strength(-1500))
                          .force("center", d3.forceCenter(thisViz.width / 2, thisViz.height / 2))

    }


    this.simulation.nodes(thisViz.networkData.nodes)
                   .on('tick',thisViz.ticked);

    this.simulation.force('link')
                   .links(thisViz.networkData.links);


     // Latest D3 version (v6 onward) does not recognize d3.event.pageX & d3.event.pageY
     // It changes to d3.pointer(event, taget_container) where 2 position values (x, y) of the mouse position are returned.
     // 2nd argument is used to calculate the relative location of the tooltip so it can scale upon when the vessel's width and height change.

     // let[x, y] = d3.pointer(event, thisViz.svg),

     this.dragstarted = (event, d) => {
         if (!event.active){
           thisViz.simulation.alphaTarget(0.3).restart();
         }//sets the current target alpha to the specified number in the range [0,1].
         d.y = d.y;
         d.x = d.x;

       }

       //When the drag gesture starts, the targeted node is fixed to the pointer
     this.dragged = (event, d) => {
         d.x = event.x;
         d.y = event.y;
       }

       //the targeted node is released when the gesture ends
     this.dragended = (event, d) => {
         if (!event.active){
           thisViz.simulation.alphaTarget(0);
         }
         d.x = null;
         d.y = null;
       }

  }
}
// Define a radar chart object
class RadarChart {
  constructor(containerId, data, width, height, margin){
    let thisViz = this;

    // These variables are used to define size of the visualization canvas and the
    // margin (or "padding") around the radar chart.  We use the margin to draw
    // things like axis labels.
    this.containerId = containerId;
    this.margin = margin;
    this.height = height;
    this.width = width;

    // Create the SVG canvas that will be used to render the visualization.
    this.svg = d3.select("#"+this.containerId)
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height)
                .attr('class', 'radar-svg');

    this.data = data;
    this.containerId = containerId;
    this.dataFlattened = [];
    this.totalGenres = [];

    // Flatten the raw data, since each movie can be categorized in multiple genres,
    // we flatten the nested data object to plot in our radar chart.
    // i.e. data -> {name:movie1, genre = ['horror', 'thriller', 'action']...} will be
    //      flattened to 3 records:
    //          {name:movie1, genre = 'horror'...},
    //          {name:movie1, genre = 'thriller'...}
    //          {name:movie1, genre = 'action'...}
    //
    // Note that our radar plot will be based on genre, so the same movie may be plotted repeatedly

    for(let d of this.data){
      for(let genreId of d.genre_ids){
        d.genreName = tmdbGenresList.filter(d => d.id === genreId)[0].name;
        this.dataFlattened.push(Object.assign({}, d))
      };
    }

    // See how many genres the movie star has participated in and remove the duplicates and sort in alphebetical order.
    for(let data of this.dataFlattened){
      this.totalGenres.push(data.genreName)
    }
    this.totalGenres = [...new Set(this.totalGenres)].sort();

    this.dataGroupedbyDepartment = [...d3.group(this.dataFlattened.filter(d => d.genreName), d => d.department)].map(d => ({
      departmentName: d[0],
      movieListByGenres: Object.fromEntries(d3.rollup(d[1], d => d.length, d => d.genreName))
    }));

    // Input 0 if no work of genre has been found
    for(let genre of thisViz.totalGenres){
      for(let data of thisViz.dataGroupedbyDepartment) {
        if(!Object.keys(data.movieListByGenres).includes(genre)){
          (data.movieListByGenres[genre] = 0)
        };
      }
    }

    // Set max value for the radar coordinates
    for(let d of thisViz.dataGroupedbyDepartment){
      if(this.maxCoordVal===undefined){
        this.maxCoordVal = d3.max(Object.values(d.movieListByGenres))
      }else{
        this.maxCoordVal > d3.max(Object.values(d.movieListByGenres))?
        this.maxCoordVal :
        this.maxCoordVal = d3.max(Object.values(d.movieListByGenres))
      }
    }

    // Draw radar axis and labels
    this.radialScale = d3.scaleLinear()
                  .domain([0,thisViz.maxCoordVal])
                  .range([0,thisViz.height/2 - this.margin]);

    this.ticks = [thisViz.maxCoordVal/4, thisViz.maxCoordVal/4*2, thisViz.maxCoordVal/4*3, thisViz.maxCoordVal]

    this.ticks.forEach(t =>
      thisViz.svg.append("circle")
      .attr("cx", thisViz.width/2)
      .attr("cy", thisViz.height/2)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .style("stroke-dasharray", ("3, 3"))
      .attr('opacity', '0')
      .transition()
      .duration(400)
      .attr('opacity','0.7')
      .attr("r", thisViz.radialScale(t))
    );

    thisViz.ticks.forEach(t =>
      thisViz.svg.append("text")
      .attr("x", thisViz.width/2)
      .attr("y", thisViz.height/2 - thisViz.radialScale(t)+12)
      .text(t.toString())
      .attr('opacity', '0')
      .transition()
      .duration(1000)
      .attr('opacity','1')

    );

    thisViz.angleToCoordinate = (angle, value, type='axisLine') => {
      if(type==='axisLine'){
        let x = Math.cos(angle) * thisViz.radialScale(value);
        let y = Math.sin(angle) * thisViz.radialScale(value);
        return {"x": thisViz.width/2 + x, "y": thisViz.height/2 - y};
      }else{
        let x = Math.cos(angle) * thisViz.radialScale(value);
        let y = Math.sin(angle) * thisViz.radialScale(value);
        return {"x": thisViz.width/2 + x-5, "y": thisViz.height/2 - y};
      }
    }

    for (let i = 0; i < this.totalGenres.length; i++) {
        let genre = thisViz.totalGenres[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / this.totalGenres.length);
        let line_coordinate = thisViz.angleToCoordinate(angle, thisViz.maxCoordVal);
        let label_coordinate = thisViz.angleToCoordinate(angle, thisViz.maxCoordVal*1.035, 'label');

        //draw axis line
        thisViz.svg.append("line")
        .attr("x1", thisViz.width/2)
        .attr("y1", thisViz.height/2)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .style("stroke-dasharray", ("3, 3"))
        .style("opacity", '0')
        .transition()
        .duration(600)
        .style("opacity", '0.3')
        .attr("stroke","black");

        //draw axis label
        thisViz.svg.append("text")
        .attr("x", label_coordinate.x-20)
        .attr("y", label_coordinate.y)
        .attr('class','genre-label')
        .text(genre)
        .attr('opacity', '0')
        .transition()
        .duration(1000)
        .attr('opacity','1');
    }


  }
  render(){
    let thisViz = this;

    let line = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveLinear);

    this.colors = {
      "Crew":'#848ee8',
      "Directing":'#8e0517',
      "Costume & Make-Up":'#591E46',
      "Actors": '#CC6695',
      "Art": '#A7A238',
      "Writing": '#edc30b',
      "Lighting":'#4546C1',
      "Sound":'#141E3C',
      "Editing":'#210b68',
      "Visual Effects":'#957FD4',
      "Production":'#23694D',
      "Camera":'#513E1B',
      "Acting": '#002b75'
    }

    this.getPathCoordinates = (data) => {
        let coordinates = [];

        for (let i = 0; i < thisViz.totalGenres.length; i++){
            let genre = thisViz.totalGenres[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / thisViz.totalGenres.length);
            coordinates.push(thisViz.angleToCoordinate(angle, data[genre]));
        }
        return coordinates;
    }
    this.renderFunc = () => {
      thisViz.filteredData = [];
      for(let ele of document.getElementsByClassName('radar-option')){
        if(document.getElementsByClassName('strength-text')[0].innerText === ele.value){
          ele.checked = true;
        }
        if(ele.checked){
          thisViz.filteredData.push(...thisViz.data.filter(d=>d.department===ele.value));
        }
      }
      // Update Chart
      thisViz.updateChart(thisViz.filteredData)
    }

    // for (let i = 0; i < this.dataGroupedbyDepartment.length; i ++){
    //     let d = this.dataGroupedbyDepartment[i].movieListByGenres;
    //     let color = thisViz.colors[this.dataGroupedbyDepartment[i].departmentName];
    //     let coordinates = thisViz.getPathCoordinates(d);
    //
    //     // thisViz.svg
    //     //     .append('g')
    //     //     // Append a g tag to group the scatterplot.
    //     //     .attr('class','radar-group')
    //     //     .selectAll('.radar-dot')
    //     //     // Take in the prebuilt data, filtering the data to show only the ones that match the "_subset" input variable,
    //     //     // The filtering operation will be triggered whenever users select a region in the dropdown menu.
    //     //     .data(coordinates)
    //     //     .enter()
    //     //     .append("circle")
    //     //     .attr('class','radar-dot')
    //     //     .attr('id', `${this.dataGroupedbyDepartment[i].departmentName}`)
    //     //     .attr("fill", color)
    //     //     .attr("cx", d => d.x)
    //     //     .attr("cy", d => d.y)
    //     //     .attr('opacity', '0')
    //     //     .transition()
    //     //     .duration(800)
    //     //     .attr('opacity','0.8')
    //     //     .attr("r", 1.5);
    //
    //     //draw the path element
    //     thisViz.svg.append("path")
    //         .datum(coordinates)
    //         .attr("d",line)
    //         // .on('mouseover',()=>{
    //         //   d3.selectAll(`#${this.dataGroupedbyDepartment[i].departmentName}`)
    //         //   .transition()
    //         //   .duration(300)
    //         //   .attr('opacity', '1');
    //         // })
    //         // .on('mouseout',()=>{
    //         //   d3.selectAll(`#${this.dataGroupedbyDepartment[i].departmentName}`)
    //         //   .attr('opacity', '0');
    //         // })
    //         .transition()
    //         .duration(800)
    //         .attr('class', 'radar-area')
    //         .attr("stroke-width", 3)
    //         .attr("stroke", color)
    //         .attr("fill", color)
    //         .attr("stroke-opacity", 1)
    //         .attr("opacity", 0.4);
    // }

    // Create filter group
    for(let i = 0; i < this.dataGroupedbyDepartment.length; i ++){
      document.getElementById('radar-filter-group').innerHTML+= `
      <div class='option-container'>
        <input type="checkbox" id="${this.dataGroupedbyDepartment[i].departmentName}" name="${this.dataGroupedbyDepartment[i].departmentName}" value="${this.dataGroupedbyDepartment[i].departmentName}" class='radar-option'>
        <label style='color:${thisViz.colors[this.dataGroupedbyDepartment[i].departmentName]}' for="${this.dataGroupedbyDepartment[i].departmentName}">${this.dataGroupedbyDepartment[i].departmentName}</label>
      </div>
      `
    }

    thisViz.renderFunc();

    for(let ele of document.getElementsByClassName('radar-option')){
      ele.addEventListener('click',()=>{
        thisViz.filteredData = [];
        for(let ele of document.getElementsByClassName('radar-option')){
          if(ele.checked){
            thisViz.filteredData.push(...thisViz.data.filter(d=>d.department===ele.value));
          }
        }
        // Update Chart
        thisViz.updateChart(thisViz.filteredData)
      })
    }


  }
  updateChart(data){
    let thisViz = this;

    this.dataFlattened = [];
    this.totalGenres = [];
    this.maxCoordVal = [];
    this.dataGroupedbyDepartment = [];

    thisViz.svg.selectAll("line").remove();
    thisViz.svg.selectAll("text").remove();
    thisViz.svg.selectAll("path").remove();
    thisViz.svg.selectAll("circle").remove();
    thisViz.svg.selectAll("g.radar-group").remove();

    for(let d of data){
      for(let genreId of d.genre_ids){
        d.genreName = tmdbGenresList.filter(d => d.id === genreId)[0].name;
        this.dataFlattened.push(Object.assign({}, d))
      };
    }

    // See how many genres the movie star has participated in and remove the duplicates and sort in alphebetical order.
    for(let data of this.dataFlattened){
      this.totalGenres.push(data.genreName)
    }
    this.totalGenres = [...new Set(this.totalGenres)].sort();


    this.dataGroupedbyDepartment = [...d3.group(this.dataFlattened.filter(d => d.genreName), d => d.department)].map(d => ({
      departmentName: d[0],
      movieListByGenres: Object.fromEntries(d3.rollup(d[1], d => d.length, d => d.genreName))
    }));


    // Input 0 if no work of genre has been found
    for(let genre of thisViz.totalGenres){
      for(let data of thisViz.dataGroupedbyDepartment) {
        if(!Object.keys(data.movieListByGenres).includes(genre)){
          (data.movieListByGenres[genre] = 0)
        };
      }
    }

    // Set max value for the radar coordinates
    for(let d of thisViz.dataGroupedbyDepartment){
      if(this.maxCoordVal===undefined){
        this.maxCoordVal = d3.max(Object.values(d.movieListByGenres))
      }else{
        this.maxCoordVal > d3.max(Object.values(d.movieListByGenres))?
        this.maxCoordVal :
        this.maxCoordVal = d3.max(Object.values(d.movieListByGenres))
      }
    }

    this.ticks = [thisViz.maxCoordVal/4, thisViz.maxCoordVal/4*2, thisViz.maxCoordVal/4*3, thisViz.maxCoordVal];

    // Input 0 if no work of genre has been found
    for(let genre of thisViz.totalGenres){
      for(let data of thisViz.dataGroupedbyDepartment) {
        if(!Object.keys(data.movieListByGenres).includes(genre)){
          (data.movieListByGenres[genre] = 0)
        };
      }
    }

    // Set max value for the radar coordinates
    for(let d of thisViz.dataGroupedbyDepartment){
      if(this.maxCoordVal===undefined){
        this.maxCoordVal = d3.max(Object.values(d.movieListByGenres))
      }else{
        this.maxCoordVal > d3.max(Object.values(d.movieListByGenres))?
        this.maxCoordVal :
        this.maxCoordVal = d3.max(Object.values(d.movieListByGenres))
      }
    }

    // Draw radar axis and labels
    this.radialScale = d3.scaleLinear()
                  .domain([0,thisViz.maxCoordVal])
                  .range([0,thisViz.height/2 - this.margin]);

    this.ticks = [thisViz.maxCoordVal/4, thisViz.maxCoordVal/4*2, thisViz.maxCoordVal/4*3, thisViz.maxCoordVal]

    this.ticks.forEach(t =>
      thisViz.svg.append("circle")
      .attr("cx", thisViz.width/2)
      .attr("cy", thisViz.height/2)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .style("stroke-dasharray", ("3, 3"))
      .attr('opacity', '0')
      .transition()
      .duration(400)
      .attr('opacity','0.7')
      .attr("r", thisViz.radialScale(t))
    );

    thisViz.ticks.forEach(t =>
      thisViz.svg.append("text")
      .attr("x", thisViz.width/2+2)
      .attr("y", thisViz.height/2 - thisViz.radialScale(t)+3)
      .text(t.toString())
      .attr('opacity', '0')
      .transition()
      .duration(1000)
      .attr('opacity','1')

    );

    thisViz.angleToCoordinate = (angle, value) => {
        let x = Math.cos(angle) * thisViz.radialScale(value);
        let y = Math.sin(angle) * thisViz.radialScale(value);
        return {"x": thisViz.width/2 + x, "y": thisViz.height/2 - y};
    }

    for (let i = 0; i < this.totalGenres.length; i++) {
        let genre = thisViz.totalGenres[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / this.totalGenres.length);
        let line_coordinate = thisViz.angleToCoordinate(angle, thisViz.maxCoordVal);
        let label_coordinate = thisViz.angleToCoordinate(angle, thisViz.maxCoordVal*1.15);

        //draw axis line
        thisViz.svg.append("line")
        .attr("x1", thisViz.width/2)
        .attr("y1", thisViz.height/2)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .style("stroke-dasharray", ("3, 3"))
        .style("opacity", '0')
        .transition()
        .duration(600)
        .style("opacity", '0.3')
        .attr("stroke","black");

        //draw axis label
        thisViz.svg.append("text")
        .attr("x", label_coordinate.x-20)
        .attr("y", label_coordinate.y)
        .attr('class','genre-label')
        .text(genre)
        .attr('opacity', '0')
        .transition()
        .duration(1000)
        .attr('opacity','1');
    }

    let line = d3.line()
                .x(d => d.x)
                .y(d => d.y);

    this.getPathCoordinates = (data) => {
        let coordinates = [];

        for (let i = 0; i < thisViz.totalGenres.length; i++){
            let genre = thisViz.totalGenres[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / thisViz.totalGenres.length);
            coordinates.push(thisViz.angleToCoordinate(angle, data[genre]));
        }
        return coordinates;
    }

    for (let i = 0; i < this.dataGroupedbyDepartment.length; i ++){
        let d = this.dataGroupedbyDepartment[i].movieListByGenres;
        let color = thisViz.colors[this.dataGroupedbyDepartment[i].departmentName];
        let coordinates = thisViz.getPathCoordinates(d);

        // thisViz.svg
        //     .append('g')
        //     // Append a g tag to group the scatterplot.
        //     .attr('class','radar-group')
        //     .selectAll('.radar-dot')
        //     // Take in the prebuilt data, filtering the data to show only the ones that match the "_subset" input variable,
        //     // The filtering operation will be triggered whenever users select a region in the dropdown menu.
        //     .data(coordinates)
        //     .enter()
        //     .append("circle")
        //     .attr('class','radar-dot')
        //     .attr('id', `${this.dataGroupedbyDepartment[i].departmentName}`)
        //     .attr("fill", color)
        //     .attr("cx", d => d.x)
        //     .attr("cy", d => d.y)
        //     .attr('opacity', '0')
        //     .transition()
        //     .duration(800)
        //     .attr('opacity','0.8')
        //     .attr("r", 1.5);

        //draw the path element
        thisViz.svg.append("path")
            .datum(coordinates)
            .attr("d",line)
            // .on('mouseover',()=>{
            //   d3.selectAll(`#${this.dataGroupedbyDepartment[i].departmentName}`)
            //   .transition()
            //   .duration(300)
            //   .attr('opacity', '1');
            // })
            // .on('mouseout',()=>{
            //   d3.selectAll(`#${this.dataGroupedbyDepartment[i].departmentName}`)
            //   .attr('opacity', '0');
            // })
            .transition()
            .duration(800)
            .attr('class', 'radar-area')
            .attr("stroke-width", 3)
            .attr("stroke", color)
            .attr("fill", color)
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.4);
    }


  }
}

// Fetch the movie genres

// Define a function to create section block
let createVizSection = (id, extraClassName) => {
  let sectionContainer = document.createElement('section');
  sectionContainer.id = id;
  sectionContainer.className = 'container' + extraClassName;

  return sectionContainer;
}

// Define a Function to display the main page
let displayMain = (pageNum, maxPageNum) => {
  let trendyMovieApiUrl = `https://api.themoviedb.org/${apiVersion}/trending/movie/${trendyMode}?api_key=${ApiKey}&page=${pageNum}`;

  // Get Trendy Movies
  fetch(trendyMovieApiUrl)
    .then(res => res.json())
    .then(dataTrendy=>{
      // Initiate a promise array
      let promises = [];
      for(let dataPt of dataTrendy.results){
        // Push all api fetch commands inside the promise array
        promises.push(
        fetch(`https://api.themoviedb.org/${apiVersion}/movie/${dataPt.id}?api_key=${ApiKey}&language=en-US`)
          .then(res => res.json())
          .then(dataMovie=>{
            dataMovie.financial_balance = dataMovie.revenue - dataMovie.budget;
            dataMovie.revenue_per_budget = dataMovie.revenue / dataMovie.budget;
            dataMovie.release_yr = Number(dataMovie.release_date.slice(0,4));
            movieDataTrendy.push(dataMovie);
          })
        );
      }

      // Set a Promise.all(), which take a iterable as input, an iterable like array [] or object {}, once when resolved (finished), it will process next lines of codes in the subsequent .then(...)
      Promise
      .all(promises)
      .then(()=>{
        movieDataTrendy = movieDataTrendy.filter(item => item.revenue>0 && item.budget>0 && item.poster_path);
        return dataTrendy;
      })
      .then(data => {

        if(data.total_pages > 1 && pageNum < maxPageNum){

          pageNum++;
          displayMain(pageNum, maxPageNum);

        }else{
          Promise
          // Render the whole HTML Components of the main page
          .all(

            [(function(){
              let main = document.querySelector('main');

              let leftSec = createVizSection('left-section', '');
              let rightSec = createVizSection('right-section', '');

              main.id ='index-main';
              main.style.display = 'flex';
              main.appendChild(leftSec);
              main.appendChild(rightSec);

              leftSec.innerHTML = `
                <div id="trendy-scatterplot">
                  <h1>Weekly Trending Movies Finance Breakdown</h1>
                  <div class='filter'>
                    <p>Movie Genres :</p>
                    <select id='genre_scatterplot_filter'>
                      <option value = 'All'>All</option>
                    </select>
                    <p>$ Balance :</p>
                    <select id='profit_scatterplot_filter'>
                      <option value = 'All'>All</option>
                      <option value = 'Earned'>Earned</option>
                      <option value = 'Lost'>Lost</option>
                    </select>
                    <div class="home time_scatterplot_filter">
                      <select id='start_time'>
                      </select>
                      <select id='end_time'>
                      </select>
                    </div>
                  </div>
                  <div id= 'trendyScatter'>
                    <div class='tooltip' style='opacity: 0;'>
                    </div>
                  </div>
                </div>
                <div id="celebity-trendy-list">
                  <h1>Weekly Trending Celebrities</h1>
                  <div id= 'trendyPerson'></div>
                </div>
              `;
              rightSec.innerHTML = `
                <div id="trendy-barchart">
                  <h1>Top Ranking of The Weekly Trending Films</h1>
                  <p>Top 15 movies if any</p>
                  <div id='barchart-filter-container'>
                    <div class='filter-group'>
                      <input type="radio" id="popularity" name="bar-filter-options" checked><label for="popularity">Popularity Score</label>
                    </div>
                    <div class='filter-group'>
                      <input type="radio" id="vote_average" name="bar-filter-options"><label for="vote_average">Avg. User Score</label>
                    </div>
                    <div class='filter-group'>
                      <input type="radio" id="revenue_per_budget" name="bar-filter-options"><label for="revenue_per_budget">Revenue / Budget</label>
                    </div>
                    <div class='filter-group'>
                      <input type="radio" id="revenue" name="bar-filter-options"><label for="revenue">Revenue</label>
                    </div>
                    <div class='filter-group'>
                      <input type="radio" id="budget" name="bar-filter-options"><label for="budget">Budget</label>
                    </div>
                    <div class='filter-group'>
                      <input type="radio" id="runtime" name="bar-filter-options"><label for="runtime">Film Length</label>
                    </div>
                  </div>
                  <div id= 'trendyBar'><div>
                </div>
              `;

            })()])
          // Render the scatterplot & Bar Chart
          // Clean up the UI (Hide preloader / set page at the top & reset local storage of pageYOffset as 0) / Finish loading with d3 animation
          .then(()=>{
            let trendyPersonApiUrl = `https://api.themoviedb.org/${apiVersion}/trending/person/${trendyMode}?api_key=${ApiKey}&page=1`;

            // Get Trendy People
            fetch(trendyPersonApiUrl)
              .then(res => res.json())
              .then(personTrendy=>{
                // filter out people without a photo
                let personTrendyFiltered = personTrendy.results.filter(d=> d.profile_path);
                let characterTextCut = (d) => {
                  // Show only partial text
                  if (d.length > 13) {
                    return (d.substring(0, 13) + "...");
                  }else{
                    return d;
                  }
                }

                for (let i = 0; i < personTrendyFiltered.length; i++) {
                  trendyPersonList += `
                  <div class='trendy-person-container'>
                    <p class="trendy-person-name" >${characterTextCut(personTrendyFiltered[i].name)}</p>
                    <img src = 'https://image.tmdb.org/t/p/original${personTrendyFiltered[i].profile_path}' alt="movie star's profile picture" id="${personTrendyFiltered[i].id}" class='main-trendy-poster'>
                  </div>
                  `;
                }

                let personTrendyNode = document.getElementById('trendyPerson');
                personTrendyNode.innerHTML = trendyPersonList,
                personTrendyPhotos = document.getElementsByClassName('main-trendy-poster');

                for(let img of personTrendyPhotos){
                  img.addEventListener('click',()=>{
                    window.location.hash = `person_id=${img.id}`;
                  });
                }

              });


            // Hide the preloader
            hidePreloader();
            // Show footer
            d3.select("footer").style("opacity", "0").transition().duration(600).style("opacity", "1");
            // Place page location on top
            window.scroll(0, 0);
            // If user return all open the home page set the localStorage of page position -> 0
            localStorage.setItem('prevLocation', 0);

            // Initiate simple animation
            let mainVizSection = d3.selectAll('.container');
            mainVizSection.style('opacity','0')
                          .transition()
                          .duration(400)
                          .style('opacity','1');
          })
          .then(()=>{
            let scatterWidth = document.getElementById("trendy-scatterplot").clientWidth - 40,
            scatterHeight = document.getElementById("trendy-scatterplot").clientHeight - 110,
            barWidth = document.getElementById("trendy-barchart").clientWidth - 60,
            barHeight = document.getElementById("trendy-barchart").clientHeight - 120;
            // Initiate scatterplot

            let trendyScatterPlot = new ScatterPlot('trendyScatter', movieDataTrendy, scatterWidth, scatterHeight*0.9);
            trendyScatterPlot.render();

            // Render Bar Chart
            let trendyBars = new HorizontalBarChart('trendyBar',movieDataTrendy, 15,15, barWidth, barHeight*0.95);
            trendyBars.render();
            //fill in movie genres
            let genreOptionHolder = document.getElementById('genre_scatterplot_filter')
            ,profitOptionHolder = document.getElementById('profit_scatterplot_filter')
            ,sortedBtn = document.querySelectorAll('input[name="bar-filter-options"]')
            ,startTimeOptionHolder = document.getElementById('start_time')
            ,endTimeOptionHolder = document.getElementById('end_time');

            // Build out the filtering fropdown
            let times = [...new Set(movieDataTrendy.map(d=>d.release_yr))];

            times.sort((a,b)=> a>b? 1:-1);
            // Time filtering methods
            // Track previous selected end time
            let previousStartTime = times[0];
            for(let releaseTime of times){
              let option = document.createElement('option');
              option.value = releaseTime;
              option.innerText = 'From '+String(releaseTime);
              startTimeOptionHolder.appendChild(option);
            }
            times.sort((a,b)=> a>b? -1:1);
            // Time filtering methods
            // Track previous selected end time
            let previousEndTime = times[0];
            for(let releaseTime of times){
              let option = document.createElement('option');
              option.value = releaseTime;
              option.innerText = 'To '+String(releaseTime);
              endTimeOptionHolder.appendChild(option);
            }



            startTimeOptionHolder.addEventListener('change',(event)=>{
              previousStartTime = event.target.value;
              startTimeFilteredFunc();

              let updatedVal = {
                'timeFiltered':true,
                'genre': genreOptionHolder.value,
                'profitType': profitOptionHolder.value,
                'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
              }
              // Update scatterplot & bar chart
              trendyScatterPlot.updateChart(updatedVal);
              trendyBars.updateChart(updatedVal);
            });
            endTimeOptionHolder.addEventListener('change',()=>{
              previousEndTime = event.target.value;
              endTimeFilteredFunc();

              let updatedVal = {
                'timeFiltered':true,
                'genre': genreOptionHolder.value,
                'profitType': profitOptionHolder.value,
                'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
              }
              // Update scatterplot & bar chart
              trendyScatterPlot.updateChart(updatedVal);
              trendyBars.updateChart(updatedVal);
            });

            let startTimeFilteredFunc = () => {
              let startTime = Number(event.target.value);

              if (startTime >= previousEndTime) {
                previousEndTime = startTime;
                for(let option of endTimeOptionHolder.children){
                  if(Number(option.value) === previousEndTime){
                    option.selected = true;
                  }else{
                    option.selected = false;
                  }
                }
              }
            }
            let endTimeFilteredFunc = () => {
              let endTime = Number(event.target.value);

              if (endTime <= previousStartTime) {
                previousStartTime = endTime;
                for(let option of startTimeOptionHolder.children){
                  if(Number(option.value) === previousStartTime){
                    option.selected = true;
                  }else{
                    option.selected = false;
                  }
                }
              }
            }


            let existedGenres = [];
            for(let d of movieDataTrendy){
              for(let genre of d.genres){
                existedGenres.push(genre.name);
              }
            }
            existedGenres = [...new Set(existedGenres)];

            for(let genre of existedGenres){
              let option = document.createElement('option');
              option.value = genre;
              option.innerText = genre;
              genreOptionHolder.appendChild(option);
            }

            genreOptionHolder.addEventListener('change',(event)=>{
              // Update scatterplot & bar chart
              // Reset Profit type
              // profitOptionHolder.value = 'All'

              let updatedVal = {
                'timeFiltered':false,
                'genre': event.target.value,
                'profitType': profitOptionHolder.value,
                'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
              }
              trendyScatterPlot.updateChart(updatedVal);
              trendyBars.updateChart(updatedVal);
            });
            profitOptionHolder.addEventListener('change',(event)=>{
              let updatedVal = {
                'timeFiltered':false,
                'genre': genreOptionHolder.value,
                'profitType': event.target.value,
                'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
              }
              // Update scatterplot & bar chart
              trendyScatterPlot.updateChart(updatedVal);
              trendyBars.updateChart(updatedVal);
            });

            for(let ele of sortedBtn){
                ele.addEventListener('change',()=>{
                  let updatedVal = {
                    'timeFiltered':false,
                    'genre': genreOptionHolder.value,
                    'profitType': profitOptionHolder.value,
                    'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
                  }
                  trendyBars.updateChart(updatedVal, ele.id);
                });
            }

          });
        }
      })
    })
    .catch(e => console.log('error'));
}

// Define a Function to display search page
let displaySearch = (pageNum, maxPageNum) => {

  // create a variable to store the search query via location hash
  let searchTerm = window.location.hash.replace('#query=','')
  let apiUrl = `https://api.themoviedb.org/${apiVersion}/search/multi?api_key=${ApiKey}&language=en-US&query=${searchTerm}&page=${pageNum}&include_adult=false`;


  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {

      typeof queryData === 'object' ? queryData.push(...data.results) : queryData = data.results;
      if(data.total_pages > 1 && pageNum < maxPageNum){
        pageNum++
        displaySearch(pageNum, maxPageNum)
      }else{
        // Set id of the search container (For css styling)
        // Select the main tag
        let main = document.querySelector('main');
        main.id = 'index-search';
        // Create a <section></section> tag to contain the search results
        // using multi-search model to fetch search result from TMDB API
        let searchContainer = createVizSection('searchContainer',' search');
        // Append search container inside <main></main> tag within the html file
        // And tweek a bit of the original css styles (change display property from 'flex' -> 'block')
        main.style.display = 'block';
        main.appendChild(searchContainer);

        let searchResults = document.getElementById('searchContainer');

        queryData.sort((previous, present) => (previous.popularity > present.popularity) ? -1 : 1);


        // Filter the falsy value of the retrieve data
        let queryDataCleaned = queryData.filter((item) => {
          if(item.media_type === 'movie'){
            return (item.release_date) && (item.overview) && (item.poster_path);
          }else if (item.media_type === 'person') {
            return item.profile_path;
          }
        });

        //Hide the preloader
        hidePreloader();

        if (queryDataCleaned.length === 0) {
          searchResults.innerHTML += `
          <span class='searchPreview no-result'>
            Sorry...We didn't retrieve any relevant result, please try again!
          </span>`
        }

        // Loop the search result into the search page
        //Render aLL Search Page HTML Components
        for(let search of queryDataCleaned){
          if(search.media_type==='person'){
            // anchor link reference
            // Person: <a class='searchResultsLink' href='index.html#person_id=${search.id}'>${search.name}</a>
            // Movie: <a class='searchResultsLink' href='index.html#movie_id=${search.id}'>${search.title}</a>

            searchResults.innerHTML +=
            `<div class='searchResults'>
              <span id='${search.id}' class='searchResultsLink person'>${search.name}</span>
              <div class='searchPreviewContainer'>
                <span class='searchPreview'>
                  <b>Type :</b> ${search.media_type[0].toUpperCase() + search.media_type.slice(1,)} |
                </span>
                <span class='searchPreview'>
                  <b>Gender :</b> ${search.gender === 1? 'Female' : search.gender === 2? 'Male':'Unspecified'} |
                </span>
                <span class='searchPreview'>
                  <b>Best Known for :</b> ${search.known_for_department[0].toUpperCase() + search.known_for_department.slice(1,)}
                </span>
                <p class='searchPreview'>
                  <b>Search Popularity Score :</b> ${String(search.popularity)}
                </p>
              </div>
            </div>`

          }else if(search.media_type==='movie') {

            searchResults.innerHTML +=
            `<div class='searchResults'>
              <span id='${search.id}' class='searchResultsLink movie'>${search.title}</span>
              <div class='searchPreviewContainer'>
                <span class='searchPreview'>
                  <b>Type :</b> ${search.media_type[0].toUpperCase() + search.media_type.slice(1,)} |
                </span>
                <span class='searchPreview'>
                  <b>Release Date :</b> ${search.release_date}
                </span>
                <p class='searchPreview'>
                  <b>Overview :</b> ${search.overview}
                </p>
                <p class='searchPreview'>
                  <b>Search Popularity Score:</b> ${search.popularity}
                </p>
              </div>
            </div>`
          }
        }
      }
    })
    .then(()=>{

      let locationY;
      let scrollingPosition = () => {
        locationY = window.pageYOffset;
      }
      // Add an event listener to remember the scrolling location
      document.addEventListener('scroll', scrollingPosition);

      // Loop through all span tag to add a click event that will alter the location.hash upcon clicking
      for(let ele of document.querySelectorAll('span.searchResultsLink')){
        ele.addEventListener('click',()=>{
          let queryId = ele.id;
          if(ele.classList.contains('movie')){
            window.location.hash = `movie_id=${queryId}`;
          }else{
            window.location.hash = `person_id=${queryId}`;
          }

          localStorage.setItem('prevLocation', locationY);
          document.removeEventListener('scroll', scrollingPosition);
        });
      }

    })
    .then(()=>{
      localStorage.getItem('prevLocation') === null? window.scroll(0, 0) : window.scroll(0, Number(localStorage.getItem('prevLocation')));
      // Initiate simple animation
      let searchSection = d3.selectAll('.container.search');
      searchSection.style('opacity','0')
                    .transition()
                    .duration(600)
                    .style('opacity','1');

      d3.select("footer").style("opacity", "0").transition().duration(600).style("opacity", "1");
    })
    .catch(e => console.log('error'));
}

// Define a Function to display movie page
let displayMovie = () => {
  let movieId = window.location.hash.replace('#movie_id=','');
  let main = document.querySelector('main');
  let apiUrl = `https://api.themoviedb.org/${apiVersion}/movie/${movieId}?api_key=${ApiKey}&language=en-US&append_to_response=credits,similar,recommendations,videos`;

  // Embed a iframe tag to play movie trailer if any
  main.innerHTML = `
    <div class='popup-window' id='trailer-frame' style = 'opacity:0;display:none;'>
      <iframe src allowfullscreen allow="autoplay"></iframe>
      <span id='trailer-close-btn' class='close-btn'>x</span>
    </div>
  `;

  main.id = 'index-movie';

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      Promise.all([(()=>{
        // Build Movie's Viz Block
        let main = document.querySelector('main');
        let profileSection = createVizSection('movie-profile-section', ' movie');
        let vizSection = createVizSection('movie-viz-section', ' movie');

        // return button element depends on the availability of trailor link
        let trailorDetector = () => {
          if(data.videos.results.length > 0){

            for(let dPt of data.videos.results){
              if(dPt.name.toLowerCase().includes('official trailer')){
                // if the video object's name contains partial string: 'official trailer', return the video key
                return `<button id="${dPt.key}" class='trailor-button'>Watch Trailer</button>`
              }else if (dPt.name.toLowerCase().includes('trailer')) {
                // if the video object's name does not contain 'official trailer', but does contain 'trailer', then also return the video key
                return `<button id="${dPt.key}" class='trailor-button'>Watch Trailer</button>`
              }
            }
            // If run thru all video items, aka the for lopp finish, and there's still no official trailer, then return unclickable btn
            return `<button id="unclickable-btn" disabled>No Trailor Available</button>`

          }else{
            return `<button id="unclickable-btn" disabled>No Trailor Available</button>`
          }
        }
        let displayFinanceInfo = (d) => {
          let revenueText,
          budgetText,
          balance,
          spendingPerformance,
          color;


          (d.revenue / 1e6)/1000 >= 1 ?
          revenueText = '$ ' + String(((d.revenue / 1e6)/1000).toFixed(2)) + ' billion' :
          (d.revenue / 1e6) >= 1?
          revenueText = '$ ' + String((d.revenue / 1e6).toFixed(1)) + ' million':
          (d.revenue) >= 1?
          revenueText = '$ ' + String(d.revenue.toFixed(1)):
          revenueText = 'Unavaliable';

          (d.budget / 1e6)/1000 >= 1 ?
          budgetText = '$ ' + String(((d.budget / 1e6)/1000).toFixed(2)) + ' billion' :
          (d.budget / 1e6) >= 1?
          budgetText = '$ ' + String((d.budget / 1e6).toFixed(2)) + ' million':
          (d.budget) >= 1?
          budgetText = '$ ' + String(d.budget.toFixed(2)):
          budgetText = 'Unavaliable';

          if(revenueText === 'Unavaliable' || budgetText === 'Unavaliable'){
            spendingPerformance = 'Unavaliable'
            balance = 'Unavaliable'
            color = '#2d5d7c'
          }else{
            if (d.revenue-d.budget>0) {
              if((Math.abs(d.revenue-d.budget) / 1e6)/1000 >= 1){
                balance = '+ $ ' + String(((Math.abs(d.revenue-d.budget) / 1e6)/1000).toFixed(2)) + ' billion';
              }else{
                balance = '+ $ ' + String((Math.abs(d.revenue-d.budget) / 1e6).toFixed(2)) + ' million';
              }
              color = '#2d5d7c'

            }else{
              if((Math.abs(d.revenue-d.budget) / 1e6)/1000 >= 1){
                balance = '- $ ' + String(((Math.abs(d.revenue-d.budget) / 1e6)/1000).toFixed(2)) + ' billion';
              }else{
                balance = '- $ ' + String((Math.abs(d.revenue-d.budget) / 1e6).toFixed(2)) + ' million';
              }
              color = '#ef5939'
            }

            if(((d.revenue/d.budget) / 1e6)/1000 >= 1){
              spendingPerformance = '+ $ ' + String((((d.revenue/d.budget) / 1e6)/1000).toFixed(2)) + ' billion';
            }else if (((d.revenue/d.budget) / 1e6) >= 1) {
              spendingPerformance = '+ $ ' + String(((d.revenue/d.budget) / 1e6).toFixed(2)) + ' million'
            }else{
              spendingPerformance = '+ $ ' + String(((d.revenue/d.budget)).toFixed(2));
            }
          }
          return {revenue: revenueText, budget: budgetText, balance: balance, revenue_per_budget:spendingPerformance, color:color}
        }
        main.style.display = 'flex';
        main.appendChild(profileSection);
        main.appendChild(vizSection);

        // Define a variable to store director's data object
        let director = data.credits.crew.filter(d=>d.job==='Director')[0];


        profileSection.innerHTML = `
          <div>
            <span>${data.original_title}</span>
            <p class = 'director-text'>Directed by <span id = 'director-name'>${director.name}</span></p>
            <img src='https://image.tmdb.org/t/p/original${data.poster_path}' alt="movie poster" id="poster">
            <div class='movie-general-info'>
              <div class='general-info-container'>
                <h3 class='general-title'>Date</h3>
                <p class='general-data'>${data.release_date}</p>
              </div>
              <div class='general-info-container'>
                <h3 class='general-title'>Time</h3>
                <p class='general-data'>${runTimeParsing(data)}</p>
              </div>
              <div class='general-info-container'>
                <h3 class='general-title'>User Score</h3>
                <p class='general-data'>${String(Math.floor(data.vote_average*1000)/100)+"%"}</p>
              </div>
            </div>
            <h2>Genre</h2>
            <div class='movie-genre-container'>${displayGenres(data)}</div>
            <h2>Quantitative Details</h2>
            <div class='movie-detail-info'>
              <div class='detail-info-container withSplitter'>
                <h3 class='detail-title'>Budget</h3>
                <p class='detail-data' style='color:#ef5939;'>${displayFinanceInfo(data).budget}</p>
              </div>
              <div class='detail-info-container withSplitter'>
                <h3 class='detail-title'>Revenue</h3>
                <p class='detail-data' style='color:#2d5d7c;'>${displayFinanceInfo(data).revenue}</p>
              </div>
              <div class='detail-info-container withSplitter'>
                <h3 class='detail-title'>Net Total</h3>
                <p class='detail-data' style='color:${displayFinanceInfo(data).color}'>${displayFinanceInfo(data).balance}</p>
              </div>
              <div class='detail-info-container'>
                <h3 class='detail-title'>Revenue / Budget</h3>
                <p class='detail-data' style='color:#2d5d7c;'>${displayFinanceInfo(data).revenue_per_budget}</p>
              </div>
            </div>
            ${trailorDetector()}
          </div>
        `;
        vizSection.innerHTML = `
          <div class='left-viz'>
            <div id='movie-scatterplot-container' class="data-viz-container">
              <h1>Similar Movies Finance Breakdown</h1>
              <div class='movie filter'>
                <p>Movie Genres :</p>
                <select id='genre_scatterplot_filter'>
                  <option value = 'All'>All</option>
                </select>
                <p>$ Balance :</p>
                <select id='profit_scatterplot_filter'>
                  <option value = 'All'>All</option>
                  <option value = 'Earned'>Earned</option>
                  <option value = 'Lost'>Lost</option>
                </select>
                <div class="movie time_scatterplot_filter">
                  <select id='start_time'>
                  </select>
                  <select id='end_time'>
                  </select>
                </div>
              </div>
              <div id= 'trendyScatter'>
                <div class='tooltip' style='opacity: 0;'>
                </div>
              </div>
            </div>
            <div id='movie-casting-container' class="data-viz-container">
              <h1>A Peek at the Casting List</h1>
              <p>15 of the full list if any</p>
              <a class='full-cast-link' target='_blank' href='https://www.themoviedb.org/movie/${data.id}/cast'>View Full Cast/Crew List on TMDB Website</a>
              <div id='photo-container'>
              </div>
            </div>
          </div>
          <div class='right-viz'>
            <div id='movie-bar-container' class="data-viz-container">
              <h1>Top Ranking of The Similar Films</h1>
              <p>Top 10 movies if any</p>
              <div id='barchart-filter-container'>
                <div class='filter-group'>
                  <input type="radio" id="popularity" name="bar-filter-options" checked><label for="popularity">Popularity Score</label>
                </div>
                <div class='filter-group'>
                  <input type="radio" id="vote_average" name="bar-filter-options"><label for="vote_average">Avg. User Score</label>
                </div>
                <div class='filter-group'>
                  <input type="radio" id="revenue_per_budget" name="bar-filter-options"><label for="revenue_per_budget">Revenue / Budget</label>
                </div>
                <div class='filter-group'>
                  <input type="radio" id="revenue" name="bar-filter-options"><label for="revenue">Revenue</label>
                </div>
                <div class='filter-group'>
                  <input type="radio" id="budget" name="bar-filter-options"><label for="budget">Budget</label>
                </div>
                <div class='filter-group'>
                  <input type="radio" id="runtime" name="bar-filter-options"><label for="runtime">Film Length</label>
                </div>
              </div>
            </div>
          </div>
        `;

        let castContainer = document.getElementById('photo-container');
        let castEle = '';
        let casts = data.credits.cast.filter(d=>d.profile_path);
        let castList;

        casts.length >= 15? castList = 15 : castList = casts.length

        let characterTextCut = (d) => {
          // Show only partial text
          if (d.length > 40) {
            return (d.substring(0, 40) + "...");
          }else{
            return d;
          }
        }

        let nameTextCut = (d) => {
          // Show only partial text
          if (d.length > 15) {
            return (d.substring(0, 15) + "...");
          }else{
            return d;
          }
        }

        for (let i = 0; i < castList; i++) {
          castEle += `
          <div class='casting-person-container'>
            <p class="casting-person-name" title='${casts[i].name}'>${nameTextCut(casts[i].name)}</p>
            <img src = 'https://image.tmdb.org/t/p/original${casts[i].profile_path}' alt="movie star's profile picture" id="${casts[i].id}" class='casting-poster'>
            <p class="casting-role-text">As <span class='casting-role-name'>${characterTextCut(casts[i].character)}</span></p>
          </div>
          `;
        }

        castContainer.innerHTML = castEle;
        let personPhotos = document.getElementsByClassName('casting-poster');

        for(let img of personPhotos){
          img.addEventListener('click',()=>{
            window.location.hash = `person_id=${img.id}`;
          });
        }

        // Add event listner to the director name that when users click on the name, it direct them to the director's page
        document.getElementById('director-name').addEventListener('click',()=>{
          window.location.hash = `person_id=${director.id}`;
        });

      })()]).then(()=>{
        let similarFilm = [];
        let promises = [];
        // Get similar movies based on recommendations
        for (let d of data.recommendations.results.filter((d)=>d.media_type==='movie')) {
          promises.push(
            fetch(`https://api.themoviedb.org/${apiVersion}/movie/${d.id}?api_key=${ApiKey}&language=en-US`)
              .then(res => res.json())
              .then(dataSimilar => {
                dataSimilar.revenue_per_budget = dataSimilar.revenue/dataSimilar.budget;
                dataSimilar.financial_balance = dataSimilar.revenue - dataSimilar.budget;
                dataSimilar.release_yr = Number(dataSimilar.release_date.slice(0,4));
                similarFilm.push(dataSimilar)
              })
          );
        }
        Promise.all(promises)
        .then(()=>{
          let dataFiltered = similarFilm.filter(d=>d.revenue>0 && d.budget>0 && d.poster_path!==''),
          scatterWidth,
          scatterHeight,
          barWidth,
          barHeight;

          // Build responsive layout of data charts based on the device width
          if(document.body.clientWidth>=1920){
            scatterWidth = document.body.clientWidth*0.345;
            scatterHeight = document.body.clientHeight*0.55;

            barWidth = document.body.clientWidth*0.33;
            barHeight = document.body.clientHeight*0.9;
          }else if(document.body.clientWidth>=1560){
            scatterWidth = document.body.clientWidth*0.355;
            scatterHeight = document.body.clientHeight*0.46;

            barWidth = document.body.clientWidth*0.3;
            barHeight = document.body.clientHeight*0.85;
          }else{
            scatterWidth = document.body.clientWidth*0.32;
            scatterHeight = document.body.clientHeight*0.62;

            barWidth = document.body.clientWidth*0.32;
            barHeight = document.body.clientHeight*1.32;
          }

          // Initiate scatterplot
          let trendyScatterPlot = new ScatterPlot('movie-scatterplot-container', dataFiltered, scatterWidth, scatterHeight);
          trendyScatterPlot.render();

          // Render Bar Chart
          let trendyBars = new HorizontalBarChart('movie-bar-container',dataFiltered, 10,10, barWidth, barHeight);
          trendyBars.render();

          //fill in movie genres
          let genreOptionHolder = document.getElementById('genre_scatterplot_filter')
          ,profitOptionHolder = document.getElementById('profit_scatterplot_filter')
          ,sortedBtn = document.querySelectorAll('input[name="bar-filter-options"]')
          ,startTimeOptionHolder = document.getElementById('start_time')
          ,endTimeOptionHolder = document.getElementById('end_time');


          // Build out the filtering fropdown
          let times = [...new Set(dataFiltered.map(d=>d.release_yr))];
          times.sort((a,b)=> a>b? 1:-1);
          // Time filtering methods
          let previousStartTime = times[0];
          for(let releaseTime of times){
            let option = document.createElement('option');
            option.value = releaseTime;
            option.innerText = 'From '+String(releaseTime);
            startTimeOptionHolder.appendChild(option);
          }
          times.sort((a,b)=> a>b? -1:1);
          // Time filtering methods
          let previousEndTime = times[0];
          for(let releaseTime of times){
            let option = document.createElement('option');
            option.value = releaseTime;
            option.innerText = 'To '+String(releaseTime);
            endTimeOptionHolder.appendChild(option);
          }

          startTimeOptionHolder.addEventListener('change',(event)=>{
            previousStartTime = event.target.value;
            startTimeFilteredFunc();

            let updatedVal = {
              'timeFiltered':true,
              'genre': genreOptionHolder.value,
              'profitType': profitOptionHolder.value,
              'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
            }
            // Update scatterplot & bar chart
            trendyScatterPlot.updateChart(updatedVal);
            trendyBars.updateChart(updatedVal);
          });
          endTimeOptionHolder.addEventListener('change',()=>{
            previousEndTime = event.target.value;
            endTimeFilteredFunc();

            let updatedVal = {
              'timeFiltered':true,
              'genre': genreOptionHolder.value,
              'profitType': profitOptionHolder.value,
              'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
            }
            // Update scatterplot & bar chart
            trendyScatterPlot.updateChart(updatedVal);
            trendyBars.updateChart(updatedVal);
          });

          let startTimeFilteredFunc = () => {
            let startTime = Number(event.target.value);

            if (startTime >= previousEndTime) {
              previousEndTime = startTime;
              for(let option of endTimeOptionHolder.children){
                if(Number(option.value) === previousEndTime){
                  option.selected = true;
                }else{
                  option.selected = false;
                }
              }
            }
          }
          let endTimeFilteredFunc = () => {
            let endTime = Number(event.target.value);

            if (endTime <= previousStartTime) {
              previousStartTime = endTime;
              for(let option of startTimeOptionHolder.children){
                if(Number(option.value) === previousStartTime){
                  option.selected = true;
                }else{
                  option.selected = false;
                }
              }
            }
          }

          let existedGenres = [];
          for(let d of dataFiltered){
            for(let genre of d.genres){
              existedGenres.push(genre.name);
            }
          }
          existedGenres = [...new Set(existedGenres)];

          for(let genre of existedGenres){
            let option = document.createElement('option');
            option.value = genre;
            option.innerText = genre;
            genreOptionHolder.appendChild(option);
          }
          genreOptionHolder.addEventListener('change',(event)=>{
            // Update scatterplot
            // Reset Profit type
            // profitOptionHolder.value = 'All'

            let updatedVal = {
              'timeFiltered':false,
              'genre': event.target.value,
              'profitType': profitOptionHolder.value,
              'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
            }
            trendyScatterPlot.updateChart(updatedVal);
            trendyBars.updateChart(updatedVal);
          });
          profitOptionHolder.addEventListener('change',(event)=>{
            let updatedVal = {
              'timeFiltered':false,
              'genre': genreOptionHolder.value,
              'profitType': event.target.value,
              'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
            }
            // Update scatterplot
            trendyScatterPlot.updateChart(updatedVal);
            trendyBars.updateChart(updatedVal);
          });

          for(let ele of sortedBtn){
              ele.addEventListener('change',()=>{
                let updatedVal = {
                  'timeFiltered':false,
                  'genre': genreOptionHolder.value,
                  'profitType': profitOptionHolder.value,
                  'time': [startTimeOptionHolder.value, endTimeOptionHolder.value]
                }
                trendyBars.updateChart(updatedVal, ele.id);
              });
          }
        })
        .catch(e=>console.log('error'));
      });
    })
    // Impelement trailor function
    .then(()=>{
      let main = document.querySelector('main');

      // Embed a iframe tag to play movie trailer if iframe tag did not been inserted
      if(!document.getElementById('trailer-frame')){
        console.log('catch-error-1');
        main.innerHTML = `
          <div class='popup-window' id='trailer-frame' style = 'opacity:0;display:none;'>
            <iframe src allowfullscreen allow="autoplay"></iframe>
            <span id='trailer-close-btn' class='close-btn'>x</span>
          </div>
        `;
      }

      // Embed a iframe tag to play movie trailer if iframe tag did not been inserted
      if(!document.getElementById('trailer-frame')){
        console.log('catch-error-2');
        main.innerHTML = `
          <div class='popup-window' id='trailer-frame' style = 'opacity:0;display:none;'>
            <iframe src allowfullscreen allow="autoplay"></iframe>
            <span id='trailer-close-btn' class='close-btn'>x</span>
          </div>
        `;
      }
    })
    .then(()=>{
      // Embed a iframe tag to play movie trailer if iframe tag did not been inserted
      if(!document.getElementById('trailer-frame')){
        console.log('catch-error-3');
        main.innerHTML = `
          <div class='popup-window' id='trailer-frame' style = 'opacity:0;display:none;'>
            <iframe src allowfullscreen allow="autoplay"></iframe>
            <span id='trailer-close-btn' class='close-btn'>x</span>
          </div>
        `;
      }
    }).then(()=>{

      let btnEle = document.getElementsByClassName('trailor-button'),
      trailerFrame = d3.select('#trailer-frame'),
      trailerPlayer = d3.select('#trailer-frame>iframe');

      openTrailer = () =>{
        trailerPlayer.attr('src', `https://www.youtube.com/embed/${btnEle[0].id}?wmode=transparent&amp;rel=0&autoplay=1`);
        trailerFrame
        .style('display','inline-block')
        .style('opacity','0')
        .transition()
        .duration(600)
        .style('opacity','1');
      };
      closeTrailer = () =>{
        trailerPlayer.attr('src', '');
        trailerFrame
        .style('opacity','1')
        .transition()
        .duration(600)
        .style('opacity','0')
        .end()
        .then(()=>{
          trailerFrame.style('display','none')
        });

      };

      // If button is clickabel, aka there's trailer, then add event listener
      if(btnEle[0]){
        btnEle[0].addEventListener('click',()=>{
          windowShield(false,trailerFrame,trailerPlayer);
          openTrailer();
        });
        document.getElementById('trailer-close-btn').addEventListener('click',()=>{
          closeTrailer();
          // Close the window shield
          d3.select('div.cover')
          .style("opacity", .6)
          .transition()
          .duration(300)
          .style("opacity", 0)
          .end()
          .then(()=>d3.select('div.cover').remove());

        });
      }
    })
    // Show the whole page
    .then(()=>{

      // Hide the preloader
      hidePreloader();
      d3.select("footer").style("opacity", "0").transition().duration(600).style("opacity", "1");
      // Place page location on top
      window.scroll(0, 0);
      // Initiate simple animation
      let movieVizSection = d3.selectAll('.container.movie');
      movieVizSection.style('opacity','0')
                    .transition()
                    .duration(600)
                    .style('opacity','1');
    })
    .catch(e => console.log('error'));
}

// Define a Function to display person page
let displayPerson = () => {

  let personId = window.location.hash.replace('#person_id=','')
  let main = document.querySelector('main');
  main.id = 'index-person';

  fetch(`https://api.themoviedb.org/${apiVersion}/person/${personId}?api_key=${ApiKey}&language=en-US&append_to_response=movie_credits`)
    .then(res => res.json())
    .then(personData => {

      let creditsData = [],
      collaborationData = [],
      collaborationFrequency = [];

      // Collaboration data will be used to build bubble chart and bar chart
      // Initiate a promise array
      let promises = [];

      // Clean up the movie credits data, adding 1 attribute, 'creditType' in each data object
      // to identify whether the movie star is a 'cast' or just a 'crew'

      let getCredit = (target, d, creditName, movieName = 'na') =>{

        // Loop through list of 'cast' & list of 'crew' (represented by 'creditType')
        // Set "creditName" as input var since different API called return data will use different key names
        // i.e.
        // 1. person's data use "movie_credits" as the key name for casting/crew data
        // 2. movie's data use "credits" as the key name for casting/crew data
          for(let creditType in d[creditName]){

            for(let credit of d[creditName][creditType]){

              // Set a new key "creditType" to store an indicator of each movie credit as being either "cast" or "crew"
              credit.creditType = creditType;

              if (movieName === 'na') {
                if (credit.creditType === 'cast' && credit.department === undefined) {
                  credit.department = 'Acting';
                }
                target.push(credit);
              }else{
                // credit data will include the original movie star, only include its credit type within the colabMovie
                // if(Number(credit.id) === Number(d.id)){
                //   credit.sourceName = d.original_name;
                //   credit.sourceCharacter = d.character;
                //
                // }
                // credit data will include the original movie star, so remove it
                credit.colabMovie = d.original_title;
                credit.colabMovieId = d.id;
                credit.poster_path = d.poster_path;
                credit.vote_average = d.vote_average;
                credit.release_date = d.release_date;
                credit.overview = d.overview;
                credit.vote_count = d.vote_count;
                credit.runtime = d.runtime;
                credit.genres = d.genres;
                target.push(credit);
              }
            }
          }
      }

      getCredit(creditsData, personData,'movie_credits');


      // Finished parsing data for radar chart then proceed processing data for network / bubble chart
      Promise.all(creditsData)
      // parsing collaboration data for network chart
      .then(()=>{
        // Clone the data (since the data wrangling later will affect the original data)
        // And the original data will be used to pass in another data chart object for visualization
        let creditsDataOriginal = [...creditsData];

        // Clean data for profile info viz
        let castStrength = personData.known_for_department;
        // Filter the movies that best fit the movie star's strength (defined by var name -> 'known_for_department')
        let topMovie = creditsData.filter(d=>d.department===castStrength);
        // Sort the movie based on user score
        topMovie.sort((prev, now)=>{
          let order;
          prev.vote_average > now.vote_average? order = -1 : order = 1;
          return order
        });
        // Filter out the movies that the vote count is below the average vote counts this star has received
        let averageCount = 0;
        for(let d of topMovie){
          averageCount += d.vote_count
        }
        averageCount /= topMovie.length

        topMovie = topMovie.filter(d => d.vote_count >= averageCount);
        // Get unique set
        topMovie = topMovie.reduce((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        // return top 10 movies if any
        if(topMovie.length >= 10){
          topMovie.splice(10,);
        }


        // Clean data for timeline bar chart

        // From all the credits+crew movie data retrieve from this movie star,
        // Make API call for each movie id, and get that movie's full list of credits data
        for(let d of creditsData){
          let apiUrl = `https://api.themoviedb.org/${apiVersion}/movie/${d.id}?api_key=${ApiKey}&language=en-US&append_to_response=credits`

          promises.push(
            fetch(apiUrl)
              .then(res => res.json())
              .then(data => {
                getCredit(collaborationData, data, 'credits', 'people_credits');
              })
          );
        }
        // Promise when collaborationData has been finished constructing
        // Do the Data Viz Here
        Promise.all(promises)
        // parsing the HTML components of the page
        .then(()=>{
          // Build Person's Viz Blocks
          Promise.all([(()=>{

            let main = document.querySelector('main');
            let profileSection = createVizSection('person-profile-section', ' person');
            let vizSection = createVizSection('person-viz-section', ' person');

            main.style.display = 'flex';
            main.appendChild(profileSection);
            main.appendChild(vizSection);

            profileSection.innerHTML = `
            <div>
              <span class='cast-name'>${personData.name}</span>
              <p class='cast-sub-line'>Best Known for <span class="strength-text profile">${castStrength}</span></p>
              <img src = 'https://image.tmdb.org/t/p/original${personData.profile_path}' alt="movie star's profile picture" id="poster-profile-page">
              <h2 class='cast-info-title'>Gender</h2>
              <p class='cast-info'>${personData.gender === 0? 'Not specified': personData.gender === 1?'Female':'Male'}</p>
              <h2 class='cast-info-title'>Date of Birth</h2>
              <p class='cast-info'>${personData.birthday}</p>
              <h2 class='cast-info-title'>Birthplace</h2>
              <p class='cast-info'>${personData.place_of_birth}</p>
              <h2 class='cast-info-title'>Top <span class="strength-text profile">${castStrength}</span> Films</h2>
              <p class='cast-info top-film'>*Top 10 user score with enough score counts if any</p>
              <div id='cast-top-movie-container'>
              </div>
              <h2 class='cast-info-title'>Movie Credits (Cast + Crew)</h2>
              <p class='cast-info highlight'>${personData.movie_credits.cast.length + personData.movie_credits.crew.length}</p>
            </div>
            `;

            vizSection.innerHTML = `
            <div class='person-upper-viz'>
              <div id="person-radar-chart" class="data-viz-container">
                <h2>Work Distribution per Movie Genre</h2>
                <p class='person-chart-sub-text'>Single Film may be categorized in multiple genres</p>
                <!-- <p class='side-note'>* The celebrity is best known for <span class='strength-text'>${personData.known_for_department}</span></p> -->
                <form id='radar-filter-group'></form>
              </div>
              <div id="person-network-chart" class="data-viz-container">
                <h2>Top Frequent Collaboration</h2>
                <p class='person-chart-sub-text'>Top 15 if any (Hover & Click nodes to see details)</p>
                <p class='side-note'>*Blue darkeness stands for collaboration frequency</p>
                <div class='tooltip collaboration' style='opacity: 0;'></div>
              </div>
            </div>
            <div class='person-bottom-viz'>
              <div id="person-bar-chart" class="data-viz-container">
                <h2>Historical Work Performance per Credited Film</h2>
                <p class='person-chart-sub-text'>Latest 50 filming works if any (Hover & Click bars to see details)</p>
                <p class='person-chart-sub-text no-decoration'>*Only displays films with average user score > 0 </p>
                <div class='filter person-page'>
                  <p class='filter-label person-page'>Work Type :</p>
                  <select id='department_filter_movie_bar'>
                    <option value = 'All'>All</option>
                  </select>
                  <p class='filter-label person-page'>Movie Genres :</p>
                  <select id='genre_filter_movie_bar'>
                    <option value = 'All'>All</option>
                  </select>
                  <p class='filter-label person-page'>Avg. User Score (All credited films included) :</p>
                  <span id='benchmark-text'></span>
                </div>
                <div class='tooltip collaboration' style='opacity: 0;'></div>
              </div>
            </div>
            `;
          })()])
            // parsing person's data into charts
          .then(()=>{

            let characterTextCut = (d) => {
              // Show only partial text
              if (d.length > 20) {
                return (d.substring(0, 20) + "...");
              }else{
                return d;
              }
            }

            let topMovieContainer = document.getElementById('cast-top-movie-container');
            for(let d of topMovie){
              topMovieContainer.innerHTML += `
              <div id='cast-top-movie-list'>
                <img src = 'https://image.tmdb.org/t/p/original${d.poster_path}' alt = 'movie star\'s top 5 works' class='cast-page-poster' id='${d.id}'>
                <span class='top-cast-movie-score'>${String(Math.floor(d.vote_average*1000)/100)+"%"}</span>
                <p class='cast-info top-movie' title='${d.original_title+' (' +d.release_date.slice(0,4)+ ')'}'>${characterTextCut(d.original_title)+' (' +d.release_date.slice(0,4)+ ')'}</p>
              </div>
              `
            }

            for(let poster of document.getElementsByClassName('cast-page-poster')){
              poster.addEventListener('click', ()=>{
                window.location.hash = `#movie_id=${poster.id}`;
              })
            }

            let topColaborationData = [],
            networkDataNum = 15;

            // Filter out the collaborationData where
            collaborationData = collaborationData.filter((d)=> d.id !== personData.id);


            // To convert a map to a regular object of array -> [...MapObjectName]
            // Group the collaboration data by

            // Collaboration Star Name is store in the 'colabMovie' key, access by collaborationFrequency[i].colabMovie[0].name
            collaborationFrequency = [...d3.group(collaborationData, d => d.id, d=>d.colabMovieId)]
                                     .map(item => {
                                        return{
                                            'ColabPersonId':item[0],
                                            'colabMovie': [...item[1].values()].map(d=>d[0])
                                        }
                                    });

            collaborationFrequency.sort((prev,now)=>{
              let order;
              prev.colabMovie.length > now.colabMovie.length? order = -1 : order = 1;
              return order
            });



            if(collaborationFrequency.length >= networkDataNum){
              for (let index of [...Array(networkDataNum).keys()]){
                topColaborationData.push(collaborationFrequency[index])
              }
            }else{
              for (let index of [...Array(collaborationFrequency.length).keys()]){
                topColaborationData.push(collaborationFrequency[index])
              }
            }


            let radarWidth, radarHeight, networkWidth, networkHeight, barWidth, barHeight;

            // Build responsive layout of data charts based on the device width
            if(document.body.clientWidth>=1920){
              radarWidth = document.body.clientWidth*0.359;
              radarHeight = document.body.clientHeight*0.75;
              networkWidth = document.body.clientWidth*0.45;
              networkHeight = document.body.clientHeight*0.8;

              barWidth = document.body.clientWidth*0.75;
              barHeight = document.body.clientHeight*0.5;
            }else if(document.body.clientWidth>=1560){
              radarWidth = document.body.clientWidth*0.359;
              radarHeight = document.body.clientHeight*0.75;
              networkWidth = document.body.clientWidth*0.359;
              networkHeight = document.body.clientHeight*0.75;

              barWidth = document.body.clientWidth*0.9;
              barHeight = document.body.clientHeight*0.52;
            }else{
              radarWidth = document.body.clientWidth*0.359;
              radarHeight = document.body.clientHeight*0.9;
              networkWidth = document.body.clientWidth*0.359;
              networkHeight = document.body.clientHeight*0.9;

              barWidth = document.body.clientWidth*0.65;
              barHeight = document.body.clientHeight*0.52;
            }


            let randar = new RadarChart('person-radar-chart',creditsData, radarWidth*0.85, radarHeight*0.6, 50);
            randar.render();

            let network = new NetworkChart("person-network-chart",topColaborationData, networkWidth*0.8, networkHeight*0.6);
            network.render();

            let verticalBar = new VerticalBarChart('person-bar-chart', creditsDataOriginal, barWidth, barHeight);
            verticalBar.render();
          })
          .then(()=>{
            // Hide the preloader
            hidePreloader();
            //Show footer
            d3.select("footer").style("opacity", "0").transition().duration(600).style("opacity", "1");
            // Place page location on top
            window.scroll(0, 0);
            // Initiate simple animation
            let personVizSection = d3.selectAll('.container.person');
            personVizSection.style('opacity','0')
                          .transition()
                          .duration(600)
                          .style('opacity','1');
          })
          .catch(e=>console.log('error'));
        })
      })
    })
    .catch(e => console.log('error'));
}

//Fetch the search results based on location hash
let display= () => {

  let mainVizSection = d3.selectAll('.container');
  let trailer = d3.select('#trailer-frame');
  d3.select("footer").style("opacity", "0");

  // ㄐemove trailer container
  if (trailer) {
    trailer.remove();
  }

  // After retrieve the genre data, then render the page components
  fetch(`https://api.themoviedb.org/${apiVersion}/genre/movie/list?api_key=${ApiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => {
			tmdbGenresList = data.genres;

      if (window.location.hash.includes('#query=')) {

        // Set the display property = 'none' for all the data viz sections at the home page.
        // Then display the search results
        mainVizSection.remove();
        displaySearch(1,2);
      }
      else if(window.location.hash.includes('#person_id=')){
        // Set the display property = 'none' for all the data viz sections at the home page.
        // Then display the person page

        mainVizSection.remove();
        displayPerson();

      }else if(window.location.hash.includes('#movie_id=')){
        // Set the display property = 'none' for all the data viz sections at the home page.
        // Then display the movie page

        mainVizSection.remove();
        displayMovie();

      }else{
        movieDataTrendy = [];
        trendyPersonList = '';

        mainVizSection.remove();
        displayMain(1,6);
      }
		});
}

// Define a function to hide preloader
let hidePreloader = () => {
  // Hide the preloader
  d3.select('.preloader')
    .style('display','none')
    .transition()
    .duration(300);
}

// Initiate Display Function to Render Page Components
display();

// Search keywords for movie / movie stars
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  // Select the input box where user typing the keyword search
  const searchbox = document.getElementById('searchBox');
  // prevent user from accidentally type in empty search term
  if(form.elements.query.value){
    window.location.hash = searchbox.name + '=' + encodeURIComponent(form.elements.query.value);
    form.elements.query.value = '';
    //If search function fire, then set the page location back on top
    localStorage.setItem('prevLocation', 0);
  }

});

// Detect if location hash has been changed either through search input or by manually altered the URL
window.addEventListener('hashchange', () => {

      if(document.getElementById('searchContainer')){
        // Clear all the previous search results
        queryData = undefined;
        document.getElementById('searchContainer').remove();

      }
      // When the location hash has been altered, fading the visualization out
      //let dataVizSection = d3.selectAll('.container')
      // There are 2 section contain the data viz, so use a loop to hide all section
      //dataVizSection.style('opacity','1')
      //              .transition()
      //              .duration(400)
      //              .style('opacity','0')
      //              .end()
      //              .then(()=>{
                      // After opacity change to 0, performing the search function

      // Show the preloader When the Hash change
      d3.select('.preloader')
        .style('display','block')
        .transition()
        .duration(200);

      // Rerun the display() function
      display();
      //              });
});

document.getElementById('tmdbLogo').addEventListener('click', ()=>{
  // Clear all the previous trendy data
  if (window.location.hash !== 'main') {
    movieDataTrendy = [];
    window.location.hash = 'main';
  }
});

window.addEventListener('resize', ()=>{
  location.reload();
});
