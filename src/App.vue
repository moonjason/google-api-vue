<template>
  <div id="app">
    <div id="modal" v-if="show">
      <div id="modal_container">
        <img id="modal_img" :src=showImg />
        <button id="modal_btn" v-on:click="toggleModal('')">X</button>
      </div>
      <div id="modal_mask"/>
    </div>
    <header>
      <h1 id="title">Jason M. Google News API Search Page</h1>
    </header>
    <div id="search">
      <input id="search_bar" v-model="searchTerm" type="text" placeholder="Find news" @keyup.enter="search(searchTerm)" required/> 
      <button type="submit" id="search_btn" v-on:submit.prevent v-on:click="search(searchTerm)">Search</button>
      <select name="Filters" @change="onChangeFilter($event)" id="filters" v-model="filter">
        <option value="" disabled selected>Select Filter</option>
        <option value="1">A-z</option>
        <option value="2">Z-a</option>
      </select>
    </div>  
    <div id="results" v-for="result of results" :key="result.title">
        <div class="results_item">
          <div class="column column-one">
            <img class="result_image" :src=result.urlToImage v-on:click="toggleModal(result.urlToImage)">
          </div>
          <div class="column column-two">
            <div class="result_details"> 
              <h2 class="result_title"><strong>{{result.title}}</strong></h2>
              <p class="result_author">Author: {{result.author || 'Unknown' }}</p>
              <p class="result_desc">{{result.description}}</p>
            </div>
          </div>
        </div>
        <div class="bottom-border"/>
    </div>
  </div>
</template>

<script>
  const api = `https://newsapi.org/v2/everything?q={{searchTerm}}`; 
  const apiKey = "&apiKey=4cd6ebeef6654d8aadb92ed84e1d5390"; 

  export default {
    name: 'app',
    data () {
      return {
        searchTerm: "",
        results: [],
        show: false,
        showImg: "",
        filter: "",
      }
    }, 
    methods: { 
      search: function (searchTerm){ 
        if(!searchTerm || searchTerm.length < 1 ) return;
        let url = api.replace('{{searchTerm}}', searchTerm) 
        fetch(url + apiKey)
          .then(res => res.json())
          .then(data => this.results = data.articles) 
      },
      toggleModal: function(url) { 
        this.showImg = url
        this.show = !this.show 
      },
      onChangeFilter: function(){
        if (!this.filter ) return ;
        if (this.filter === "1") {
          this.results.sort( (a ,b) => a.title.localeCompare(b.title))
        } else { 
          this.results.sort( (a ,b) => b.title.localeCompare(a.title))
        }

      }
    }
  }
</script>

<style lang="css" src="./App.css" />