import { Component, OnInit, Input } from '@angular/core';
import { Hotnet2Result } from '../hotnet2-result';
import { Hotnet2ResultService } from '../hotnet2-result.service';
import * as d3 from '../../assets/d3.min.js';
import * as gd3 from '../../assets/gd3.js';
declare var $: any;

@Component({
  selector: 'app-subnetworks-vis',
  templateUrl: './subnetworks-vis.component.html',
  styleUrls: ['./subnetworks-vis.component.scss']
})
export class SubnetworksVisComponent implements OnInit {
  @Input() efo: string;
  @Input() network: string;
  response : Hotnet2Result;
  data: any;

  constructor(public hotnet2ResultService : Hotnet2ResultService ) { }

  ngOnInit() {
        this.getPost();
        this.getPost2();  //temp for json
  }

  getPost(): void {
        this.hotnet2ResultService.getPost(this.efo, this.network)
        .subscribe(result => this.response = new Hotnet2Result(result),
                error => console.log("Error :: " + error)
        );
  }

  getPost2(): void {
        this.hotnet2ResultService.getPost(this.efo, this.network)
        .subscribe(result => this.data = result,
                error => console.log("Error :: " + error),
		() => this.draw()
        );
  }

  draw(): void {
	var pval = d3.select("span#pval"), 
	expected = d3.select("span#expected"),
	observed = d3.select("span#observed");
	var data = this.data;
	var stats	   = data.stats,
	geneToHeat  = data.geneToHeat,
	predictions = data.predictions,
	subnetworks = data.subnetworks,
	autodelta = data.params.auto_delta;
	// Set up the deltas and subnetwork sizes
	var sizes = Object.keys(stats[Object.keys(stats)[0]]).sort(function(a, b){ return d3.ascending(Number(a), Number(b)); });
	var kSelect = d3.select('select#k');
        var delta = autodelta,
		k  = sizes[0];
	window.location.hash = delta;
	if (k in stats[delta]){
		pval.text(stats[delta][k].pval);
		observed.text(stats[delta][k].observed);
		expected.text(stats[delta][k].expected);
	} else{
		pval.text("N/A");
		observed.text("N/A");
		expected.text("N/A");
	}
	// Set up the results table
	d3.select("#results-table-wrapper").selectAll('*').remove();
	var table = d3.select("#results-table-wrapper").append('table').attr('class', 'table');
	table.append('thead').append('tr')
		.selectAll('.header-row')
		.data(['Subnetwork', 'Size', 'Total Heat']).enter()
		.append('th')
		.text(function(d){ return d; });
	var tbody = table.append('tbody');
	var rows = tbody.selectAll('.subnetwork-row')
		.data(subnetworks[delta].filter(function(d){ return d.nodes.length >= k; })).enter()
		.append('tr');
	//rows.append('td').append('div').html(drawSubnetwork($(this).parent().parent().data(),d3.select(this)));
	for (let i=1;i<=rows[0].length;i++) {
		document.getElementsByTagName("tr")[i].insertCell(-1).innerHTML="<div id='subn"+i.toString()+"'></div>";
		drawSubnetwork(rows.data()[i-1],d3.select('#subn'+i.toString()));
	}
	rows.append('td').text(function(d){ return d.nodes.length; });
	rows.append('td').text(function(d){
		return d3.round(d.nodes.reduce(function(total, n){ return total + n.value; }, 0), 4);
	});
	document.getElementsByTagName("th")[0].style.width='815px';
	function drawSubnetwork(subnetwork, elem){
		// Create the view, removing any previous elements
		var style = {
			nodeColor : ['rgb(38, 125, 255)','rgb(237, 14, 28)'],
			width: 700,
			height: 300
		};
		elem.datum(subnetwork)
			.call( gd3.graph({ style: style }) );
	}
  }
}

