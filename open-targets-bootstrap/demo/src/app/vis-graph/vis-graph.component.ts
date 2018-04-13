import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Tip from 'd3-tip';

@Component({
  selector: 'app-vis-graph',
  templateUrl: './vis-graph.component.html',
  styleUrls: ['./vis-graph.component.scss']
})
export class VisGraphComponent implements OnInit {
  scalecolors = ['#cbdcea','#98bad6','#6697c2','#3375ad','#005299'];

  svg;
  color;
  simulation;
  link;
  node;
  zoom_handler;
  zoom;
  tool_tip;
  nodeList;
  selectedNode;

  @Input() efo;
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.svg = d3.select("svg");
    //clear out all nodes from previous data
    this.svg.selectAll("*").remove();

    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = d3.scaleLinear()
        .domain([0,1])
        .range(['#cbdcea','#005299']);

    this.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    this.zoom_handler = d3.zoom()
    .on("zoom", ()=>this.zoom_actions());
    this.zoom_handler(this.svg);

    this.getNodes();

    this.render(this.data);
  }

  ticked() {
    this.link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    this.node
        .attr("transform", (d)=> { return "translate("+d.x+", "+d.y+")"; });
  }

  render(graph){
    this.zoom = this.svg.append("g")
      .attr("class", "everything")

    this.tool_tip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) { 
        let score = (typeof d.displayscore != 'undefined') ? d.displayscore : d.assoc;
        let roundedAssoc : any;
        if (score == 1 ) {
          roundedAssoc = "1.0";
        } else if (score == 0){
          roundedAssoc = "0";
        } else {
          roundedAssoc =  score.toFixed(5);
        }
        return "<div style='text-align: center;'><span>"+d.label+"</span><br><span>"+roundedAssoc+"</span></div>"});
    this.svg.call(this.tool_tip);

    this.link = this.zoom.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", function(d) {
        return (d.type == "manual") ? '10,5' : '1,0';
      });

    this.node = this.zoom.selectAll(".nodes")
    .data(graph.nodes)
    .enter()
    .append("g")
    .attr("class", "nodes")
    .call(d3.drag()
      .on("start", (d)=>this.dragstarted(d))
      .on("drag", (d)=>this.dragged(d))
      .on("end", (d)=>this.dragended(d)));

    this.node.append("circle")
      .attr("id", (d) => {return "circle"+d.id;})
      .attr("r", 10)
      .attr("fill", (d) => { return this.color(d.assoc); })
      .on("mouseover", this.tool_tip.show)
      .on("mouseout", this.tool_tip.hide)
      .on("click", (d)=>this.selectNode(d));

    this.node.append("text")
      .attr("dy", 5)
      .attr("dx", 10)
      .text((d) => { return d.label; });
    
    this.simulation
      .nodes(graph.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(graph.links);
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  zoom_actions() {
    this.zoom.attr("transform", d3.event.transform)
  }

   updateScore() {
    var colorConv = d3.scaleLinear()
      .domain([0,1])
      .range(['#cbdcea','#005299']);

    var choices = [];
    d3.selectAll('input').each(function(d) {
      var cb = d3.select(this);
      if (cb.property("checked")){
        choices.push(cb.property("value"));
      };
    });
    d3.selectAll('circle').each(function(d) {
      var evidence = [];
      var total = 0;
      for (var i = 0; i < choices.length; i++) {
        evidence.push(parseFloat(d[choices[i]]));
      }
      if (!evidence.length) {
        evidence.push(parseFloat(d.assoc));
      }
      evidence.sort(function(a,b){return b-a});
      for (var i = 0; i < evidence.length; i++) {
        //harmonic sum - s1/1^2, s2/2^2 etc.
        total += evidence[i]/((i+1)*(i+1));
      }
      d.displayscore = total;
      d3.select('#circle'+d.id)
        .attr("fill", (d)=> { return colorConv(total > 1 ? 1 : total); })
    });
  }

  getNodes() {
    this.nodeList = [];
    for (var i = 0; i < this.data.nodes.length; i++) {
      this.nodeList.push(this.data.nodes[i].label);
    }
    this.nodeList.sort();
  }

  selectNode(d) {
    this.selectedNode = d;
    //this.zoom_handler.translateTo(this.zoom, 350, 250);
  }
}
