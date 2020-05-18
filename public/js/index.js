
// ============== ELEMENTS ==============
const $language = document.querySelector('#language')
const $suggestionsList = document.querySelector('.suggestions-list')




// ============== EVENTS ==============
$("#language").change(onChangeLanguage)




//  ============== EVENTS FUNCTIONS ==============
function onChangeLanguage() { 
    localStorage.setItem('language', $language.value)
    getTitlesFromAPI()
}

// TODO: Melhor e criar um botão para cada
const onSelectSubtitle = (id) => {
    location.href = `${API}/api/v1/subtitle/${id}/download`
}

const onSelectLink = (magnetLink) => {
    window.open(magnetLink, "_self")
}




//  =============== FUNCTIONS ===============

const buildDivTitle = (t) => {
    return `        
        <div class="box p-2 px-3 bg-light d-md-flex hoverable">
            <div class="d-md-flex box col-md-8 col-12">
                <div class="icon mr-3">
                    <span class="icon-map-signs"></span>
                </div>
                <div> <p class="small-pad" ><b>${t.fileName}</b></p> </div>
            </div>
            <div class="d-md-flex box col-md-2 col-12"  onclick="onSelectSubtitle('${t._id}')">
                <button class="btn btn-block btn-outline-primary btn-sm" title="Download Subtitle">
                    <span class="icon icon-cloud_download"></span>
                    Subtitle
                </button>
            </div>
            <div class="d-md-flex box col-md-2 col-12"  onclick="onSelectLink('${t.magnetLink}')">
                <button class="btn btn-block btn-outline-primary btn-sm" title="Anime Magnet Link Torrent">
                    <span class="icon icon-cloud_download"></span>    
                    Torrent
                </button>
            </div>
        </div>
    `
}
const getQueryParams = () => {
    return { language: localStorage.getItem('language') || $language.value || 'pt' }
}

const onReceiveTitles = (titles) => {
    $suggestionsList.innerHTML = ''
    $suggestionsList.innerHTML = titles.map(buildDivTitle).join('')
}

const getTitlesFromAPI = () => getLastTitlesReleasedAPI(getQueryParams()).then(json => onReceiveTitles(json.titles))






//  ==================== INIT =================
getTitlesFromAPI().then(() => console.log('Titles loaded'))
$language.value = localStorage.getItem('language') || (window.navigator.userLanguage || window.navigator.language).split('-')[0]




