const CACHE_NAME = "my-schedule-v1";


const CACHE_FILES = [

    "./",

    "./index.html",

    "./manifest.json",

    "./icon.png"

];





// 安装阶段

self.addEventListener(
    "install",
    event => {


        event.waitUntil(

            caches.open(CACHE_NAME)

            .then(
                cache => {

                    return cache.addAll(
                        CACHE_FILES
                    );

                }

            )

        );


    }

);







// 激活阶段

self.addEventListener(
    "activate",
    event => {


        event.waitUntil(

            caches.keys()

            .then(
                keys => {


                    return Promise.all(

                        keys.map(

                            key => {


                                if(
                                    key !== CACHE_NAME
                                ){

                                    return caches.delete(key);

                                }


                            }

                        )

                    );


                }

            )

        );


    }

);








// 请求拦截

self.addEventListener(
    "fetch",
    event => {


        event.respondWith(

            caches.match(
                event.request
            )

            .then(

                response => {


                    return response ||

                    fetch(
                        event.request
                    );


                }

            )


        );


    }

);