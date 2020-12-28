$(document).ready( () => {
    $('#submitForm').on('submit', (e) => {
        e.preventDefault();
        const userName = $('#inputField').val();

        $.ajax({
            url: `https://api.github.com/users/${userName}`,
            data: {
                client_id: "f30fdd6edd055edc086b",
                client_secret: "8421ca6e9749aa8fde9a912bb34bbea10c5fa679",
            },
        }).done((user) => {

            console.log(user);
            
            $.ajax({
                url: `https://api.github.com/users/${userName}/repos`,
                data: {
                    client_id: "f30fdd6edd055edc086b",
                    client_secret: "8421ca6e9749aa8fde9a912bb34bbea10c5fa679",
                    sort: 'created: asc',
                    per_page: 10
                },
            }).done((repos) => {
                $.each(repos, (index, repo) => {
                    $('#latest').append(`
                        <div class="well mt-3 p-3">
                            <div class="row">
                                <div class="col-md-7">
                                    <b class="text-danger">${repo.name}: </b>${repo.description}        
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-primary myBadge">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-success myBadge">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-info myBadge">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a class="btn btn-danger" target="_blank" href="${repo.html_url}">View Repo</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });

            $("#infos").html(`
            <div class="panel panel-default p-2">
                <div class="panel-body">
                    <div class="row d-flex flex-row">
                        <div class="col-md-3 imgAndButton" >
                            <img src="${user.avatar_url}" class="rounded userImage">
                            <a target="_blank" class="btn btn-danger text-center btn-block" href="${user.html_url}">View Github Page</a>
                        </div>

                        <div class="col-md-9 d-flex flex-column">
                            <div class="panelTop d-flex flex-column">
                                <div class="myHeader mb-2">
                                    <h2 class="text-info font-weight-bold">${user.name}</h2>
                                </div>    
                                
                                <div class="myLabels">
                                    <a href="#latestRepoText" class="badge badge-primary myBadge">Public Repos: ${user.public_repos}</a>
                                    <span class="badge badge-success myBadge">Public Gists: ${user.public_gists}</span>
                                    <span class="badge badge-info myBadge">Followers: ${user.followers}</span>
                                    <span class="badge badge-warning myBadge">Following: ${user.following}</span>
                                </div>
                            </div>

                            <p class="text-muted p-2">${user.bio}</p>

                            <ul class="list-group mb-2 mr-2">
                                <li class="list-group-item mb-1 bg-success text-light">Company: ${user.company}</li>
                                <li class="list-group-item mb-1 bg-success text-light">Website/Blog: ${user.blog}</li>
                                <li class="list-group-item mb-1 bg-success text-light">Location: ${user.location}</li>
                                <li class="list-group-item mb-1 bg-success text-light">Member Since: ${user.created_at}</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            
            <div id="latestRepos">
                <h3 class="text-info font-weight-bold mt-2 mb-2" id="latestRepoText">Latest Repos</h3>
                <div id="latest"></div>
            </div>
            `);
        
        });
    });
    
});