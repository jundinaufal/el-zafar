const calculateButton = document.getElementById("calculate");
        const originSelect = document.getElementById("origin");
        const destinationSelect = document.getElementById("destination");
        const resultPrice = document.getElementById("price");
        const resultTime = document.getElementById("time");
        const resetButton = document.querySelector(".reset");
        
        const earthRadiusKm = 6371;
        const speedKnots = 400;
        
        function calculateDistance(lat1, lon1, lat2, lon2) {
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) *
              Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return earthRadiusKm * c;
        }
        
        const indonesianAirports = [
          { name: "Aceh", code: "BTJ", lat: 5.5556, lon: 95.4444 },
          { name: "Bengkulu", code: "BKS", lat: -3.8213, lon: 102.4633 },
          { name: "Jambi", code: "DJB", lat: -1.6000, lon: 103.6167 },
          { name: "Bangka Belitung", code: "TJQ", lat: -2.8333, lon: 106.1167 },
          { name: "Batam", code: "BTH", lat: 1.0833, lon: 104.0500 },
          { name: "Lampung", code: "TKG", lat: -5.4333, lon: 105.2667 },
          { name: "Riau", code: "PKU", lat: 0.5000, lon: 101.4333 },
          { name: "Padang", code: "PDG", lat: -0.9667, lon: 100.3667 },
          { name: "Palembang", code: "PLM", lat: -2.9833, lon: 104.7500 },
          { name: "Medan", code: "KNO", lat: 3.5833, lon: 98.6667 },
          { name: "Jakarta", code: "CGK", lat: -6.1667, lon: 106.6499 },
          { name: "Yogyakarta", code: "YIA", lat: -7.7958, lon: 110.3667 },
          { name: "Bandung", code: "BDO", lat: -6.9167, lon: 107.6167 },
          { name: "Semarang", code: "SRG", lat: -6.9833, lon: 107.6167 },
          { name: "Solo", code: "SOC", lat: -7.5333, lon: 110.8500 },
          { name: "Malang", code: "MLG", lat: -7.9500, lon: 112.6167 },
          { name: "Surabaya", code: "SUB", lat: -7.2500, lon: 112.7500 },
          { name: "Pontianak", code: "PNK", lat: 0.0167, lon: 109.333333 },
          { name: "Banjarmasin", code: "BDJ", lat: -3.3333, lon: 114.5833 },
          { name: "Palangkaraya", code: "PKY", lat: -2.7167, lon: 113.7833 },
          { name: "Samarinda", code: "AAP", lat: -0.5000, lon: 117.1333 },
          { name: "Balikpapan", code: "BPN", lat: 1.2167, lon: 116.8833 },
          { name: "Tarakan", code: "TRK", lat: 3.5833, lon: 117.6333 },
          { name: "Gorontalo", code: "GTO", lat: 1.1167, lon: 123.2500 },
          { name: "Makassar", code: "UPG", lat: -5.1500, lon: 119.3500 },
          { name: "Palu", code: "PLW", lat: -0.9000, lon: 119.9167 },
          { name: "Kendari", code: "KDI", lat: -3.9500, lon: 122.4833 },
          { name: "Manado", code: "MDC", lat: 3.9500, lon: 124.7500 },
        ];
        
        const destinationAirports = [...indonesianAirports];
        
        indonesianAirports.forEach(airport => {
          const option = document.createElement("option");
          option.value = airport.code;
          option.textContent = airport.name;
          originSelect.appendChild(option);
          const clonedOption = option.cloneNode(true);
          destinationSelect.appendChild(clonedOption);
        });
        
        originSelect.addEventListener("change", () => {
          const selectedOption = originSelect.value;
          const index = indonesianAirports.findIndex(
            airport => airport.code === selectedOption
          );
          if (index !== -1) {
            destinationAirports.splice(index, 1);
            const updatedDestinationOptions = destinationSelect.options;
            for (let i = updatedDestinationOptions.length - 1; i >= 0; i--) {
              if (updatedDestinationOptions[i].value === selectedOption) {
                updatedDestinationOptions.remove(i);
              }
            }
            const newOption = new Option(indonesianAirports[index].name, indonesianAirports[index].code);
            destinationSelect.appendChild(newOption);
          }
        });
        
        function formatTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
          }
          
          calculateButton.addEventListener("click", () => {
            const origin = originSelect.value;
            const destination = destinationSelect.value;
          
            const originIndex = indonesianAirports.findIndex(airport => airport.code === origin);
            const destinationIndex = indonesianAirports.findIndex(airport => airport.code === destination);
        if(originIndex !== destinationIndex){
            if (originIndex !== -1 && destinationIndex !== -1) {
              const distance = calculateDistance(indonesianAirports[originIndex].lat, indonesianAirports[originIndex].lon, indonesianAirports[destinationIndex].lat, indonesianAirports[destinationIndex].lon);
              const flightTime = distance / speedKnots;
              const flightTimeInMinutes = Math.round(flightTime * 60);
              const flight = {
                price: Math.round(Math.ceil(flightTime) * 8000),
                time: formatTime(flightTimeInMinutes)
              };
        //   console.log(distance);
              resultPrice.textContent = `Estimated Price: USD ${flight.price}`;
              resultTime.textContent = `Estimated Time: ${flight.time}`;
            } else {
              resultPrice.textContent = ""; 
              
            }
        }else{
            resultPrice.textContent = "Invalid Input"; 
            resultTime.textContent = "";
        }
          });
          console.log(calculateButton);
        
        resetButton.addEventListener("click", () => {
            while (originSelect.options.length) {
              originSelect.remove(0);
            }
            while (destinationSelect.options.length) {
              destinationSelect.remove(0);
            }
            indonesianAirports.forEach(airport => {
              const option = document.createElement("option");
              option.value = airport.code;
              option.textContent = airport.name;
              originSelect.appendChild(option);
              const clonedOption = option.cloneNode(true);
              destinationSelect.appendChild(clonedOption);
            });
            resultPrice.textContent = "";
            resultTime.textContent = "";
          });