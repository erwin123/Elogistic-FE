import { Injectable } from "@angular/core";
import * as jsPDF from "jspdf";

@Injectable({
  providedIn: "root"
})
export class PdfService {
  constructor() {}

  printFNPB(data, detailOrder, isMobile) {
    let verticalPosition = 15;
    let horizontalPosition = 15;
    this.getDataUri(
      window.location.origin + "/assets/images/logo-white.png",
      function(dataUri) {
        let pdf = new jsPDF({
          orientation: "landscape"
        });
        pdf.setFont("Times", "bold");
        pdf.setFontSize(14);
        pdf.text(
          "FORM NOTA PENGAMBILAN BARANG/MATERIAL",
          horizontalPosition + 135,
          verticalPosition + 20,
          {
            align: "center"
          }
        );

        pdf.setFont("Times", "normal");
        pdf.setFontSize(11);

        pdf.addImage(
          dataUri,
          "PNG",
          horizontalPosition,
          verticalPosition + 10,
          40,
          20
        );

        // Order No
        pdf.text("No", horizontalPosition, verticalPosition + 38);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 38);
        pdf.text(data.order_no, horizontalPosition + 27, verticalPosition + 38);

        // Order Date
        pdf.text("Tanggal", horizontalPosition, verticalPosition + 44);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 44);
        pdf.text(
          data.created_date,
          horizontalPosition + 27,
          verticalPosition + 44
        );

        // Project Name
        pdf.text("Project", horizontalPosition, verticalPosition + 50);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 50);
        pdf.text(
          data.project_name,
          horizontalPosition + 27,
          verticalPosition + 50
        );

        // Zone Name
        pdf.text("Zona", horizontalPosition, verticalPosition + 56);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 56);
        pdf.text(
          data.zone_name,
          horizontalPosition + 27,
          verticalPosition + 56
        );

        // No Reserv
        pdf.text("No. Reserv", horizontalPosition, verticalPosition + 62);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 62);
        pdf.text(
          data.no_reservasi,
          horizontalPosition + 27,
          verticalPosition + 62
        );

        // No GI
        let no_gi = "";
        for (let i = 0; i < detailOrder[0].no_good_issue.length; i++) {
          const element = detailOrder[0].no_good_issue[i];
          no_gi += element.no_good_issue;
          if (i + 1 < detailOrder[0].no_good_issue.length) {
            no_gi += ", ";
          }
        }
        pdf.text("No. GI", horizontalPosition, verticalPosition + 68);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 68);
        pdf.text(no_gi, horizontalPosition + 27, verticalPosition + 68);

        // Count Print
        pdf.text("Cetakan ke", horizontalPosition, verticalPosition + 74);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 74);
        pdf.text(
          (data.count_print + 1).toString(),
          horizontalPosition + 27,
          verticalPosition + 74
        );

        // Request By
        pdf.text("Dipesan oleh", horizontalPosition, verticalPosition + 80);
        pdf.text(":", horizontalPosition + 25, verticalPosition + 80);
        pdf.text(
          data.created_by,
          horizontalPosition + 27,
          verticalPosition + 80
        );

        // Tablie List Material
        pdf.setFont("Times", "Bold");
        pdf.text(
          "No.",
          horizontalPosition + 55 + (7 - pdf.getTextWidth("No.")) / 2,
          verticalPosition + 90
        );
        pdf.text(
          "No.Material",
          horizontalPosition + 62 + (40 - pdf.getTextWidth("No.Material")) / 2,
          verticalPosition + 90
        );
        pdf.text(
          "Nama Material",
          horizontalPosition +
            102 +
            (80 - pdf.getTextWidth("Nama Material")) / 2,
          verticalPosition + 90
        );
        pdf.text(
          "Jumlah",
          horizontalPosition + 182 + (15 - pdf.getTextWidth("Jumlah")) / 2,
          verticalPosition + 90
        );
        pdf.text(
          "Keterangan",
          horizontalPosition + 197 + (20 - pdf.getTextWidth("Keterangan")) / 2,
          verticalPosition + 90
        );
        pdf.setFont("Times", "normal");
        let startVerticalPosition = 96;

        for (let index = 0; index < detailOrder.length; index++) {
          const element = detailOrder[index];
          pdf.text(
            (index + 1).toString(),
            horizontalPosition + 62 - pdf.getTextWidth((index + 1).toString()),
            verticalPosition + startVerticalPosition
          );
          pdf.text(
            element.material_code,
            horizontalPosition +
              62 +
              (40 - pdf.getTextWidth(element.material_code)) / 2,
            verticalPosition + startVerticalPosition
          );
          pdf.text(
            element.material_name,
            horizontalPosition +
              102 +
              (80 - pdf.getTextWidth(element.material_name)) / 2,
            verticalPosition + startVerticalPosition
          );
          pdf.text(
            element.quantity.toString(),
            horizontalPosition +
              196 -
              pdf.getTextWidth(element.quantity.toString()),
            verticalPosition + startVerticalPosition
          );
          if (element.reject_status == "Reject") {
            pdf.setTextColor("#FF0000");
          } else if (element.reject_status == "Approve") {
            pdf.setTextColor("#00FF00");
          } else {
            pdf.setTextColor("#000000");
          }
          pdf.text(
            element.reject_status,
            horizontalPosition +
              197 +
              (20 - pdf.getTextWidth(element.reject_status)) / 2,
            verticalPosition + startVerticalPosition
          );
          pdf.setTextColor("#000000");
          startVerticalPosition = startVerticalPosition + 6;
          if (startVerticalPosition >= 132) {
            pdf.setFontSize(10);
            pdf.setTextColor("#9a9a9a");
            pdf.setFont("Times", "italic");
            pdf.text(
              "Form ini merupakan hasil persetujuan secara digital ",
              horizontalPosition,
              verticalPosition + 175
            );
            pdf.setTextColor("#000000");
            pdf.setFont("Times", "normal");
            pdf.addPage();
            startVerticalPosition = 20;
          }
        }

        // Disetujui Oleh
        pdf.text(
          "Disetujui Oleh,",
          horizontalPosition + (40 - pdf.getTextWidth("Disetujui Oleh,")) / 2,
          verticalPosition + 138
        );
        pdf.text(
          data.created_by,
          horizontalPosition + (40 - pdf.getTextWidth(data.created_by)) / 2,
          verticalPosition + 157
        );
        pdf.setTextColor("#9a9a9a");
        pdf.setFont("Times", "italic");
        pdf.text(
          data.created_date,
          horizontalPosition + (40 - pdf.getTextWidth(data.created_date)) / 2,
          verticalPosition + 163
        );
        pdf.setTextColor("#000000");
        pdf.setFont("Times", "normal");
        pdf.text(
          "Construction Manager",
          horizontalPosition +
            (40 - pdf.getTextWidth("Construction Manager")) / 2,
          verticalPosition + 169
        );

        // Diserahkan Oleh
        pdf.text(
          "Diserahkan Oleh,",
          horizontalPosition +
            110 +
            (40 - pdf.getTextWidth("Diserahkan Oleh,")) / 2,
          verticalPosition + 138
        );
        pdf.text(
          data.hand_over_by,
          horizontalPosition +
            110 +
            (40 - pdf.getTextWidth(data.hand_over_by)) / 2,
          verticalPosition + 157
        );
        pdf.setTextColor("#9a9a9a");
        pdf.setFont("Times", "italic");
        pdf.text(
          data.hand_over_date,
          horizontalPosition +
            110 +
            (40 - pdf.getTextWidth(data.hand_over_date)) / 2,
          verticalPosition + 163
        );
        pdf.setTextColor("#000000");
        pdf.setFont("Times", "normal");
        pdf.text(
          "Logistik",
          horizontalPosition + 110 + (40 - pdf.getTextWidth("Logistik")) / 2,
          verticalPosition + 169
        );

        // Diterima Oleh
        pdf.text(
          "Diterima Oleh,",
          horizontalPosition +
            220 +
            (40 - pdf.getTextWidth("Diterima Oleh,")) / 2,
          verticalPosition + 138
        );
        pdf.text(
          data.created_by,
          horizontalPosition +
            220 +
            (40 - pdf.getTextWidth(data.pick_up_by)) / 2,
          verticalPosition + 157
        );
        pdf.setTextColor("#9a9a9a");
        pdf.setFont("Times", "italic");
        pdf.text(
          data.pick_up_date,
          horizontalPosition +
            220 +
            (40 - pdf.getTextWidth(data.pick_up_date)) / 2,
          verticalPosition + 163
        );

        //Footer
        pdf.setFontSize(10);
        pdf.setTextColor("#9a9a9a");
        pdf.setFont("Times", "italic");
        pdf.text(
          "Form ini merupakan hasil persetujuan secara digital ",
          horizontalPosition,
          verticalPosition + 175
        );
        pdf.setProperties({
          title: data.order_no + ".pdf"
        });
        if (isMobile) {
          pdf.save(data.order_no + ".pdf");
        } else {
          pdf.output("dataurlnewwindow");
        }
      }
    );
  }

  getDataUri(url, cb) {
    var image = new Image();

    image.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvas.getContext("2d").drawImage(image, 0, 0);
      cb(canvas.toDataURL("image/jpeg"));
    };

    image.src = url;
  }
}
