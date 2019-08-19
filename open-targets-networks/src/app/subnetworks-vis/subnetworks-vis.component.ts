import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

@Component({
  selector: 'app-subnetworks-vis',
  templateUrl: './subnetworks-vis.component.html',
  styleUrls: ['./subnetworks-vis.component.scss']
})
export class SubnetworksVisComponent implements OnInit {
  scalecolors = ['#cbdcea','#98bad6','#6697c2','#3375ad','#005299'];

  svg;
  defs;
  color;
  simulation;
  link;
  node;
  zoom_handler;
  zoom;
  tool_tip;
  nodeList;
  selectedNode;
  filters = 'scores';
  arrows = true;
  manual = true;

  @Input() efo;
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.svg = d3.select("#graphsvg");
    //clear out all nodes from previous data
    this.svg.selectAll("*").remove();

    //add arrowhead definitions
    this.defs = this.svg.append("svg:defs");
    this.addMarker("directed","auto","#999");
    this.addMarker("rev-directed","auto-start-reverse","#999");
    this.addMarker("stimulatory","auto","#FF4136");
    this.addMarker("rev-stimulatory","auto-start-reverse","#FF4136");
    this.addMarker("inhibitory","auto","#0074D9");
    this.addMarker("rev-inhibitory","auto-start-reverse","#0074D9");
    this.addMarker("dual","auto","#B10DC9");
    this.addMarker("rev-dual","auto-start-reverse","#B10DC9");

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
      .attr("class", function(d) {
        return (d.type == "manual") ? 'line-manual' : 'line-calculated';
      })
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", function(d) {
        return (d.type == "manual") ? '10,5' : '1,0';
      })
      .attr("marker-end", function(d) {
        if (!d.type) { return null}
        return "url(#"+d.type+")"
      })
      .attr("marker-start", function(d) {
        if (!d.reverse) { return null}
        return "url(#"+d.reverse+")"
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
      .attr("class", (d) => { return (d.assoc == 0) ? "node-manual" : null} )
      .on("mouseover", this.tool_tip.show)
      .on("mouseout", this.tool_tip.hide)
      .on("click", (d)=>this.selectNode(d));

    this.node.append("text")
      .attr("dy", 5)
      .attr("dx", 10)
      .attr("class", (d) => { return (d.assoc == 0) ? "text-manual" : null} )
      .text((d) => { return d.label; });
    
    this.simulation
      .nodes(graph.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(graph.links);
  }

  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

    //d.fx = null;  //switch to these for pinned nodes - for figures
    //d.fy = null;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;

    //d.x = d3.event.x;  //switch to these for pinned nodes - for figures
    //d.y = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;

    //d.fx = d3.event.x;  //switch to these for pinned nodes - for figures
    //d.fy = d3.event.y;
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

  toggleFilters(filters) {
    this.filters = filters;
  }

  toggleArrows() {
    this.arrows = this.arrows ? false : true;
    if (this.arrows) {
      d3.selectAll('.arrowhead').style("display","block");
    } else {
      d3.selectAll('.arrowhead').style("display","none");
    }
  }

  toggleManual() {
    this.manual = this.manual ? false : true;
    if (this.manual) {
      d3.selectAll('.line-manual').style("display","block");
      d3.selectAll('.node-manual').style("display","block");
      d3.selectAll('.text-manual').style("display","block");
    } else {
      d3.selectAll('.line-manual').style("display","none");
      d3.selectAll('.node-manual').style("display","none");
      d3.selectAll('.text-manual').style("display","none");
    }
  }

  addMarker(markerid, direction, colour) {
    this.defs.append("svg:marker")
    .attr("id", markerid)
    .attr("refX", 9)
    .attr("refY", 3)
    .attr("markerWidth", 7)
    .attr("markerHeight", 8)
    .attr("orient", direction)
    .attr("stroke-linecap","butt")
    .append("path")
    .attr("class","arrowhead")
    .attr("d", "M 1 1 L 4.5 3 L 1 5")
    .style("stroke", colour)
    .attr("fill","none");
  }

}
