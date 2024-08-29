let interval = document.getElementsByClassName("interval");

interval[0].addEventListener("change", () => {
    if(interval[0].value == "")
    {
        interval[0].value = 0;
    }

    if(interval[0].value > interval[1].value)
    {
       
        interval[0].value = Math.min(interval[0].value,interval[1].value);
    }
})

interval[1].addEventListener("change", () => {   
    if(interval[1].value == "")
    {
        interval[1].value = 0;
    }

    if(interval[0].value > interval[1].value)
    {
        interval[1].value = Math.max(interval[0].value,interval[1].value);
    }
})
