/* ==========================================================================
   MONSHERI — Aplicación Interactiva
   Fátima de Bigault · Ciudad de San Juan, Argentina
   ========================================================================== */

(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5492645431877';

  const buildWhatsAppUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  /* ------------------------------------------------------------------------
     1. NAVBAR, MENÚ MÓVIL, SCROLL ACTIVO & REVEAL
     ------------------------------------------------------------------------ */
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const onScrollHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  if (menuToggle && mobileDrawer) {
    const closeDrawer = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.hidden = true;
    };

    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.hidden = expanded;
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeDrawer();
    });
  }

  // Resaltar enlace activo según sección visible
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach((sec) => navObserver.observe(sec));

    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-revealed'));
  }

  // Año dinámico en footer
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------------
     2. MODALES NATIVOS (<dialog>) — LIGHT DISMISS & CATEGORÍAS ALTA COSTURA
     ------------------------------------------------------------------------ */
  const setupDialogDismiss = (dialog) => {
    if (!dialog) return;
    dialog.querySelectorAll('[data-close-dialog]').forEach((btn) => {
      btn.addEventListener('click', () => dialog.close());
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  };

  const categoryDialog = document.getElementById('category-dialog');
  const sizeGuideDialog = document.getElementById('size-guide-dialog');
  setupDialogDismiss(categoryDialog);
  setupDialogDismiss(sizeGuideDialog);

  const CATEGORY_DATA = {
    novias: {
      kicker: 'Monsheri Design · Novias',
      title: 'Vestidos de Novia a Medida',
      eventValue: 'Casamiento',
      img: './assets/images/cat-novias.jpg',
      lead:
        'Acompañamos cada etapa de tu camino al altar creando un vestido irrepetible, diseñado desde cero según tu silueta, tu estilo y el espíritu de tu boda.',
      steps: [
        'Primera cita de inspiración: boceto personalizado, análisis de silueta y asesoramiento detallado para la compra de telas nobles.',
        'Moldería exclusiva trazada especialmente sobre tus medidas corporales.',
        'Múltiples pruebas de calce (entre 3 y 5 encuentros) para perfeccionar escote, corsetería, caída de falda, cola y bordados artesanales.',
        'Entrega final impecable con tiempo suficiente para tus últimos ajustes antes del gran día.'
      ],
      note: 'Sugerimos reservar tu primera cita con al menos 4 a 6 meses de anticipación.'
    },
    quinceaneras: {
      kicker: 'Monsheri Design · 15 Años',
      title: 'Quinceañeras de Ensueño',
      eventValue: '15 Años',
      img: './assets/images/cat-quince.jpg',
      lead:
        'Transformamos el vestido que siempre soñaste en una pieza única: desde siluetas princesa con tules luminosos hasta diseños desmontables 2 en 1 para bailar toda la noche.',
      steps: [
        'Diseño conjunto con la quinceañera y su familia: colores, corsetería, mangas o faldas desmontables.',
        'Asesoramiento integral de géneros (tules, gasas, rasos, encajes y apliques).',
        'Moldería personalizada que acompaña el movimiento con total comodidad y sujeción.',
        'Pruebas de calce progresivas donde se ajustan largos con el calzado definitivo y detalles bordados a mano.'
      ],
      note: 'Ideal iniciar el proceso entre 4 y 6 meses antes de la fiesta.'
    },
    egresadas: {
      kicker: 'Monsheri Design · Egresadas',
      title: 'Egresadas, Dos Piezas & Tutús',
      eventValue: 'Egresadas',
      img: './assets/images/cat-egresadas.jpg',
      lead:
        'Diseños frescos, modernos y con sello de autor para tu noche de egreso: vestidos largos de gala, conjuntos de dos piezas, tutús voluminosos y bandas personalizadas.',
      steps: [
        'Definición del estilo: vestido gala, conjunto top/corset + falda, tutú artesanal o banda personalizada haciendo juego.',
        'Toma de medidas y moldería a medida pensada para destacar tu figura y moverte libremente.',
        'Asesoramiento en elección de telas, caídas, tajos y tonos en tendencia.',
        'Pruebas de calce dedicadas para lograr un ajuste perfecto antes de la cena y recepción.'
      ],
      note: 'Recomendamos consultar con al menos 3 meses de anticipación por alta demanda de temporada.'
    },
    madrinas: {
      kicker: 'Monsheri Design · Gala & Eventos',
      title: 'Madrinas & Fiesta',
      eventValue: 'Fiesta',
      img: './assets/images/cat-fiesta.jpg',
      lead:
        'Elegancia atemporal, cortes arquitectónicos y drapeados que estilizan y realzan tu presencia en bodas, galas y celebraciones especiales.',
      steps: [
        'Asesoramiento de diseño y colorimetría según horario del evento y rol en la celebración.',
        'Moldería anatómica personalizada con terminaciones de alta costura interior y exterior.',
        'Guía experta para seleccionar géneros con la caída y estructura exacta del diseño.',
        'Pruebas de calce cuidadas para garantizar confort, postura y un largo exacto con tus zapatos.'
      ],
      note: 'Recordá que los presupuestos corresponden a diseño y confección (telas aparte, con asesoramiento incluido).'
    },
    civil: {
      kicker: 'Monsheri Design · Ceremonia Civil',
      title: 'Civil Minimalista & Contemporáneo',
      eventValue: 'Civil',
      img: './assets/images/cat-civil.jpg',
      lead:
        'Vestidos midi, monos de autor, conjuntos sastreros femeninos y siluetas depuradas con detalles sutiles para celebrar el civil con frescura y sofisticación.',
      steps: [
        'Elección de una silueta moderna y versátil (midi, corto, drapeado o dos piezas) acorde al horario y lugar.',
        'Trazado de moldería propia que garantiza líneas limpias y calce impecable.',
        'Recomendación de crepes, satenes o sedas de excelente cuerpo y caída.',
        'Pruebas de calce rápidas y precisas para un acabado artesanal impecable.'
      ],
      note: 'Consultanos también si buscás un look doble para Civil + Iglesia/Fiesta.'
    }
  };

  let activeCategoryKey = 'novias';
  const catImg = document.getElementById('cat-dialog-img');
  const catKicker = document.getElementById('cat-dialog-kicker');
  const catTitle = document.getElementById('cat-dialog-title');
  const catLead = document.getElementById('cat-dialog-lead');
  const catSteps = document.getElementById('cat-dialog-steps');
  const catNote = document.getElementById('cat-dialog-note');
  const catCta = document.getElementById('cat-dialog-cta');

  document.querySelectorAll('.catalog-card').forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.dataset.category;
      const data = CATEGORY_DATA[key];
      if (!data || !categoryDialog) return;

      activeCategoryKey = key;
      catImg.src = data.img;
      catImg.alt = data.title;
      catKicker.textContent = data.kicker;
      catTitle.textContent = data.title;
      catLead.textContent = data.lead;
      catNote.textContent = data.note;

      catSteps.innerHTML = '';
      data.steps.forEach((stepText) => {
        const li = document.createElement('li');
        li.textContent = stepText;
        catSteps.appendChild(li);
      });

      categoryDialog.showModal();
    });
  });

  if (catCta && categoryDialog) {
    catCta.addEventListener('click', () => {
      const data = CATEGORY_DATA[activeCategoryKey];
      if (data) {
        const targetRadio = document.querySelector(
          `input[name="eventType"][value="${data.eventValue}"]`
        );
        if (targetRadio) targetRadio.checked = true;
      }
      categoryDialog.close();
      document.getElementById('cotizar-design')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  document.getElementById('open-size-guide')?.addEventListener('click', () => {
    sizeGuideDialog?.showModal();
  });

  /* ------------------------------------------------------------------------
     3. MONSHERI DESIGN — FORMULARIO "TRAÉ TU DISEÑO PROPIO"
     ------------------------------------------------------------------------ */
  const designForm = document.getElementById('design-inquiry-form');
  const designColorSwatches = document.querySelectorAll('#design-color-swatches .color-swatch');
  const designColorLabel = document.getElementById('design-color-label');
  const eventDateInput = document.getElementById('event-date');
  const eventDateAlert = document.getElementById('event-date-alert');
  const dropzone = document.getElementById('design-dropzone');
  const fileInput = document.getElementById('reference-upload');
  const previewContainer = document.getElementById('reference-previews');
  const uploadCounter = document.getElementById('upload-counter');
  const designFeedback = document.getElementById('design-form-feedback');

  let selectedDesignColor = 'Blanco Nupcial';
  let uploadedReferences = []; // Array<{ id, file, url }>
  let isUrgentDate = false;

  // Fecha mínima = hoy
  const getTodayISO = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  if (eventDateInput) {
    eventDateInput.min = getTodayISO();

    const validateEventDate = () => {
      const raw = eventDateInput.value;
      if (!raw) {
        eventDateAlert.hidden = true;
        isUrgentDate = false;
        return;
      }

      const [year, month, day] = raw.split('-').map(Number);
      const chosen = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const threeMonthsAhead = new Date(today);
      threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + 3);

      eventDateAlert.hidden = false;
      if (chosen < today) {
        isUrgentDate = true;
        eventDateAlert.className = 'date-alert date-alert--warning';
        eventDateAlert.innerHTML =
          '<span aria-hidden="true">✦</span><span>Por favor elegí una fecha futura para tu evento.</span>';
      } else if (chosen < threeMonthsAhead) {
        isUrgentDate = true;
        eventDateAlert.className = 'date-alert date-alert--warning';
        eventDateAlert.innerHTML =
          '<span aria-hidden="true">✦</span><span>Para garantizar una confección artesanal óptima, sugerimos al menos 3 meses de anticipación. Consultanos disponibilidad urgente por WhatsApp.</span>';
      } else {
        isUrgentDate = false;
        eventDateAlert.className = 'date-alert date-alert--ok';
        eventDateAlert.innerHTML =
          '<span aria-hidden="true">✓</span><span>¡Excelente anticipación! Contamos con el tiempo ideal para la moldería personalizada y todas tus pruebas de calce.</span>';
      }
    };

    eventDateInput.addEventListener('change', validateEventDate);
    eventDateInput.addEventListener('input', validateEventDate);
  }

  // Swatches de color Design
  designColorSwatches.forEach((btn) => {
    btn.addEventListener('click', () => {
      designColorSwatches.forEach((el) => {
        el.classList.remove('is-selected');
        el.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
      selectedDesignColor = btn.dataset.color || 'Blanco Nupcial';
      if (designColorLabel) designColorLabel.textContent = selectedDesignColor;
    });
  });

  // Drag & Drop (hasta 3 imágenes con vista previa)
  const renderPreviews = () => {
    if (!previewContainer || !uploadCounter) return;
    previewContainer.innerHTML = '';
    uploadCounter.textContent = `${uploadedReferences.length} / 3 fotos`;

    uploadedReferences.forEach((item) => {
      const figure = document.createElement('div');
      figure.className = 'preview-thumb';

      const img = document.createElement('img');
      img.src = item.url;
      img.alt = `Referencia ${item.file.name}`;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'preview-thumb__remove';
      removeBtn.setAttribute('aria-label', `Eliminar imagen ${item.file.name}`);
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => {
        URL.revokeObjectURL(item.url);
        uploadedReferences = uploadedReferences.filter((r) => r.id !== item.id);
        renderPreviews();
      });

      const caption = document.createElement('span');
      caption.className = 'preview-thumb__name';
      caption.textContent = item.file.name;

      figure.append(img, removeBtn, caption);
      previewContainer.appendChild(figure);
    });
  };

  const addReferenceFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;

    const remaining = 3 - uploadedReferences.length;
    if (remaining <= 0) {
      if (designFeedback) {
        designFeedback.textContent = 'Podés adjuntar hasta 3 imágenes de referencia. Eliminá una para cambiarla.';
        designFeedback.classList.add('is-error');
      }
      return;
    }

    if (designFeedback) {
      designFeedback.textContent = '';
      designFeedback.classList.remove('is-error');
    }

    files.slice(0, remaining).forEach((file) => {
      uploadedReferences.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        url: URL.createObjectURL(file)
      });
    });

    if (files.length > remaining && designFeedback) {
      designFeedback.textContent = 'Se cargaron las primeras imágenes hasta completar el máximo de 3 referencias.';
    }

    renderPreviews();
  };

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      addReferenceFiles(e.target.files);
      fileInput.value = '';
    });

    ['dragenter', 'dragover'].forEach((evt) => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach((evt) => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove('is-dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      addReferenceFiles(e.dataTransfer?.files);
    });
  }

  // Envío formulario Alta Costura -> WhatsApp
  if (designForm) {
    designForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('design-client-name')?.value.trim();
      const eventDateRaw = eventDateInput?.value;
      const eventType =
        designForm.querySelector('input[name="eventType"]:checked')?.value || 'Casamiento';
      const notes = document.getElementById('design-notes')?.value.trim();

      if (!clientName) {
        designFeedback.textContent = 'Por favor ingresá tu nombre para personalizar la consulta.';
        designFeedback.classList.add('is-error');
        document.getElementById('design-client-name')?.focus();
        return;
      }

      if (!eventDateRaw) {
        designFeedback.textContent = 'Seleccioná la fecha estimada de tu evento.';
        designFeedback.classList.add('is-error');
        eventDateInput?.focus();
        return;
      }

      const [y, m, d] = eventDateRaw.split('-');
      const formattedDate = `${d}/${m}/${y}`;

      const lines = [
        'Hola Fátima! Te escribo desde la web de *Monsheri Design (Alta Costura)* para solicitar cita y presupuesto:',
        '',
        `• *Nombre:* ${clientName}`,
        `• *Tipo de evento:* ${eventType}`,
        `• *Paleta deseada:* ${selectedDesignColor}`,
        `• *Fecha estimada del evento:* ${formattedDate}${isUrgentDate ? ' (consulta de disponibilidad con menos de 3 meses)' : ''}`
      ];

      if (uploadedReferences.length > 0) {
        const names = uploadedReferences.map((r) => r.file.name).join(', ');
        lines.push(`• *Fotos de referencia listas para enviar (${uploadedReferences.length}):* ${names}`);
      }

      if (notes) {
        lines.push(`• *Idea / Detalles:* ${notes}`);
      }

      lines.push('', 'Quedo atenta para coordinar nuestra primera cita en el atelier.');

      designFeedback.classList.remove('is-error');
      designFeedback.textContent = '¡Listo! Abriendo WhatsApp con tu consulta prearmada...';

      window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    });
  }

  /* ------------------------------------------------------------------------
     4. MONSHERI AMBOS — CONFIGURADOR INTERACTIVO EN VIVO
     ------------------------------------------------------------------------ */
  const amboForm = document.getElementById('ambo-form');
  const amboBaseSwatches = document.querySelectorAll('#ambo-base-swatches .color-swatch');
  const amboPipingSwatches = document.querySelectorAll('#ambo-piping-swatches .color-swatch');
  const amboBaseLabel = document.getElementById('ambo-base-label');
  const amboPipingLabel = document.getElementById('ambo-piping-label');
  const extraEmbroidery = document.getElementById('extra-embroidery');
  const embroideryFields = document.getElementById('embroidery-fields');
  const embroideryNameInput = document.getElementById('embroidery-name');
  const embroideryProfInput = document.getElementById('embroidery-profession');
  const extraCofia = document.getElementById('extra-cofia');
  const amboFeedback = document.getElementById('ambo-form-feedback');

  // Elementos de vista previa SVG y resumen
  const previewModelTag = document.getElementById('preview-model-tag');
  const svgBaseEls = document.querySelectorAll('.svg-base-fill');
  const svgPipingFillEls = document.querySelectorAll('.svg-piping-fill');
  const svgPipingStrokeEls = document.querySelectorAll('.svg-piping-stroke');
  const svgCollarV = document.getElementById('svg-collar-v');
  const svgCollarMao = document.getElementById('svg-collar-mao');
  const svgSlimDarts = document.getElementById('svg-slim-darts');
  const svgSecondJacket = document.getElementById('svg-second-jacket');
  const svgJacketBody = document.getElementById('svg-jacket-body');
  const svgCofia = document.getElementById('svg-cofia');
  const svgEmbroidery = document.getElementById('svg-embroidery');
  const svgEmbroideryName = document.getElementById('svg-embroidery-name');
  const svgEmbroideryRole = document.getElementById('svg-embroidery-role');

  const sumModel = document.getElementById('sum-model');
  const sumBaseColor = document.getElementById('sum-base-color');
  const sumPipingColor = document.getElementById('sum-piping-color');
  const sumSize = document.getElementById('sum-size');
  const sumExtras = document.getElementById('sum-extras');

  const amboState = {
    model: 'Chaqueta Cuello en V con vivos combinados',
    modelKey: 'v-neck',
    baseColor: 'Bordó',
    baseHex: '#6E2636',
    pipingColor: 'Verde Salvia',
    pipingHex: '#B3D4C8',
    size: 'M',
    embroidery: false,
    embroideryName: '',
    embroideryProf: '',
    cofia: false
  };

  // Contraste legible para el texto bordado según luminancia del color base
  const isLightHex = (hex) => {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return false;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.65;
  };

  const updateAmboPreview = () => {
    // 1. Colores SVG
    const actualPipingHex = amboState.pipingHex === 'same' ? amboState.baseHex : amboState.pipingHex;
    svgBaseEls.forEach((el) => {
      el.style.fill = amboState.baseHex;
    });
    svgPipingFillEls.forEach((el) => {
      el.style.fill = actualPipingHex;
    });
    svgPipingStrokeEls.forEach((el) => {
      el.style.stroke = actualPipingHex;
    });

    // 2. Modelo SVG (Cuello en V / Mao / Slim / Promo 2+1)
    const isMao = amboState.modelKey === 'mao';
    const isSlim = amboState.modelKey === 'slim';
    const isPromo = amboState.modelKey === 'promo';

    if (svgCollarV) svgCollarV.style.opacity = isMao ? '0' : '1';
    if (svgCollarMao) svgCollarMao.style.opacity = isMao ? '1' : '0';
    if (svgSlimDarts) svgSlimDarts.style.opacity = isSlim ? '1' : '0';
    if (svgSecondJacket) svgSecondJacket.style.opacity = isPromo ? '1' : '0';

    if (svgJacketBody) {
      svgJacketBody.setAttribute(
        'd',
        isSlim
          ? 'M116 72 L148 54 L212 54 L244 72 L278 130 L248 148 L230 118 Q224 180 232 248 L128 248 Q136 180 130 118 L112 148 L82 130 Z'
          : 'M112 72 L148 54 L212 54 L248 72 L284 132 L250 150 L234 118 L238 248 L122 248 L126 118 L110 150 L76 132 Z'
      );
    }

    const shortModelLabels = {
      'v-neck': 'Cuello en V con vivos',
      mao: 'Cuello Mao',
      slim: 'Corte Entallado / Slim',
      promo: 'Promo 2 Chaquetas + 1 Pantalón'
    };
    if (previewModelTag) previewModelTag.textContent = shortModelLabels[amboState.modelKey] || amboState.model;

    // 3. Cofia
    if (svgCofia) svgCofia.style.opacity = amboState.cofia ? '1' : '0';

    // 4. Bordado en vivo
    if (svgEmbroidery) {
      svgEmbroidery.style.opacity = amboState.embroidery ? '1' : '0';
      const ink = isLightHex(amboState.baseHex) ? '#5E3333' : '#FAF7F2';
      if (svgEmbroideryName) {
        svgEmbroideryName.setAttribute('fill', ink);
        svgEmbroideryName.textContent = amboState.embroideryName || 'Tu Nombre';
      }
      if (svgEmbroideryRole) {
        svgEmbroideryRole.setAttribute('fill', ink);
        svgEmbroideryRole.textContent = (amboState.embroideryProf || 'PROFESIÓN').toUpperCase();
      }
    }

    // 5. Resumen textual
    if (sumModel) sumModel.textContent = amboState.model;
    if (sumBaseColor) sumBaseColor.textContent = amboState.baseColor;
    if (sumPipingColor) sumPipingColor.textContent = amboState.pipingColor;
    if (sumSize) sumSize.textContent = amboState.size;

    const extrasList = [];
    if (amboState.embroidery) {
      const detail = [amboState.embroideryName, amboState.embroideryProf].filter(Boolean).join(' · ');
      extrasList.push(detail ? `Bordado (${detail})` : 'Bordado personalizado');
    }
    if (amboState.cofia) {
      extrasList.push('Cofia haciendo juego');
    }
    if (sumExtras) {
      sumExtras.textContent = extrasList.length ? extrasList.join(' + ') : 'Ninguno';
    }
  };

  if (amboForm) {
    amboForm.querySelectorAll('input[name="amboModel"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        amboState.model = radio.value;
        amboState.modelKey = radio.dataset.modelKey || 'v-neck';
        updateAmboPreview();
      });
    });

    amboBaseSwatches.forEach((btn) => {
      btn.addEventListener('click', () => {
        amboBaseSwatches.forEach((el) => {
          el.classList.remove('is-selected');
          el.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');
        amboState.baseColor = btn.dataset.color || 'Bordó';
        amboState.baseHex = btn.dataset.hex || '#6E2636';
        if (amboBaseLabel) amboBaseLabel.textContent = amboState.baseColor;
        updateAmboPreview();
      });
    });

    amboPipingSwatches.forEach((btn) => {
      btn.addEventListener('click', () => {
        amboPipingSwatches.forEach((el) => {
          el.classList.remove('is-selected');
          el.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');
        amboState.pipingColor = btn.dataset.color || 'Verde Salvia';
        amboState.pipingHex = btn.dataset.hex || '#B3D4C8';
        if (amboPipingLabel) amboPipingLabel.textContent = amboState.pipingColor;
        updateAmboPreview();
      });
    });

    amboForm.querySelectorAll('input[name="amboSize"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        amboState.size = radio.value;
        updateAmboPreview();
      });
    });

    extraEmbroidery?.addEventListener('change', () => {
      amboState.embroidery = extraEmbroidery.checked;
      if (embroideryFields) embroideryFields.hidden = !extraEmbroidery.checked;
      updateAmboPreview();
    });

    embroideryNameInput?.addEventListener('input', () => {
      amboState.embroideryName = embroideryNameInput.value.trim();
      updateAmboPreview();
    });

    embroideryProfInput?.addEventListener('input', () => {
      amboState.embroideryProf = embroideryProfInput.value.trim();
      updateAmboPreview();
    });

    extraCofia?.addEventListener('change', () => {
      amboState.cofia = extraCofia.checked;
      updateAmboPreview();
    });

    amboForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (amboState.embroidery && !amboState.embroideryName && !amboState.embroideryProf) {
        amboFeedback.textContent = 'Ingresá el nombre y/o profesión que deseás bordar en tu ambo.';
        amboFeedback.classList.add('is-error');
        embroideryNameInput?.focus();
        return;
      }

      const extrasLines = [];
      if (amboState.embroidery) {
        const text = [amboState.embroideryName, amboState.embroideryProf].filter(Boolean).join(' — ');
        extrasLines.push(`Bordado personalizado: "${text}"`);
      }
      if (amboState.cofia) {
        extrasLines.push('Cofia / gorro quirúrgico haciendo juego');
      }

      const lines = [
        'Hola Fátima! Quiero encargar mi ambo desde el configurador de *Monsheri Ambos*:',
        '',
        `• *Modelo:* ${amboState.model}`,
        '• *Tela:* Acrocel de alta calidad',
        `• *Color base:* ${amboState.baseColor}`,
        `• *Color de vivos (bolsillos y cuello):* ${amboState.pipingColor}`,
        `• *Talle:* ${amboState.size}`,
        `• *Extras:* ${extrasLines.length ? extrasLines.join(' + ') : 'Sin extras'}`,
        '',
        'Entiendo que se realiza por encargo a medida con una seña previa del 50%. ¿Me pasás el presupuesto y coordinamos?'
      ];

      amboFeedback.classList.remove('is-error');
      amboFeedback.textContent = '¡Pedido armado! Abriendo WhatsApp con tu configuración...';

      window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    });

    updateAmboPreview();
  }

  /* ------------------------------------------------------------------------
     5. SISTEMA DE AGENDA Y TURNOS ONLINE (4 PASOS + COMPROBANTE)
     Reglas reales San Juan:
       - Domingos bloqueados
       - Lun a Vie: 09:00 a 16:00 hs (09:00, 10:30, 12:00, 14:00, 15:15)
       - Sábados: 09:00 a 20:00 hs (09:00, 10:30, 12:00, 15:00, 16:30, 18:00, 19:00)
     ------------------------------------------------------------------------ */
  const WEEKDAY_SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:15'];
  const SATURDAY_SLOTS = ['09:00', '10:30', '12:00', '15:00', '16:30', '18:00', '19:00'];

  const MONTHS_ES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const DAYS_ES = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ];

  const bookingState = {
    step: 1,
    service: '',
    dateObj: null, // Date local
    timeSlot: '',
    fullName: '',
    phone: '',
    notes: ''
  };

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  let calViewYear = todayStart.getFullYear();
  let calViewMonth = todayStart.getMonth();

  const stepPanels = document.querySelectorAll('.booking-step');
  const stepIndicators = document.querySelectorAll('[data-step-indicator]');
  const calMonthTitle = document.getElementById('cal-month-title');
  const calDaysGrid = document.getElementById('calendar-days');
  const calPrevBtn = document.getElementById('cal-prev');
  const calNextBtn = document.getElementById('cal-next');
  const selectedDaySummary = document.getElementById('selected-day-summary');
  const scheduleRulePill = document.getElementById('schedule-rule-pill');
  const timeSlotsGrid = document.getElementById('time-slots-grid');
  const bookingMiniSummary = document.getElementById('booking-mini-summary');
  const bookingDetailsForm = document.getElementById('booking-details-form');
  const bookingFeedback = document.getElementById('booking-form-feedback');

  const formatDateLong = (date) => {
    if (!date) return '';
    return `${DAYS_ES[date.getDay()]} ${date.getDate()} de ${MONTHS_ES[date.getMonth()]} de ${date.getFullYear()}`;
  };

  const goToStep = (targetStep) => {
    bookingState.step = targetStep;

    stepPanels.forEach((panel) => {
      const panelStep = Number(panel.dataset.step);
      panel.hidden = panelStep !== targetStep;
    });

    stepIndicators.forEach((item) => {
      const idx = Number(item.dataset.stepIndicator);
      item.classList.remove('is-active', 'is-done');
      if (targetStep === 5) {
        item.classList.add('is-done');
      } else if (idx === targetStep) {
        item.classList.add('is-active');
      } else if (idx < targetStep) {
        item.classList.add('is-done');
      }
    });
  };

  // Botones "Volver"
  document.querySelectorAll('[data-go-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      goToStep(Number(btn.dataset.goStep));
    });
  });

  // Paso 1: Selección de Servicio
  document.querySelectorAll('.service-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      bookingState.service = btn.dataset.service || '';
      renderCalendar();
      goToStep(2);
    });
  });

  // Paso 2: Renderizar Calendario Mensual (bloqueando Domingos y días pasados)
  const renderCalendar = () => {
    if (!calDaysGrid || !calMonthTitle) return;

    calMonthTitle.textContent = `${MONTHS_ES[calViewMonth]} ${calViewYear}`;

    // Deshabilitar retroceso antes del mes actual
    const isCurrentMonth =
      calViewYear === todayStart.getFullYear() && calViewMonth === todayStart.getMonth();
    if (calPrevBtn) calPrevBtn.disabled = isCurrentMonth;

    // Máximo 6 meses hacia adelante
    const maxDate = new Date(todayStart.getFullYear(), todayStart.getMonth() + 6, 1);
    const currentViewFirst = new Date(calViewYear, calViewMonth, 1);
    if (calNextBtn) calNextBtn.disabled = currentViewFirst >= maxDate;

    calDaysGrid.innerHTML = '';

    // Semana comienza en Lunes (0 = Lun ... 6 = Dom)
    const firstDayJS = new Date(calViewYear, calViewMonth, 1).getDay();
    const startOffset = (firstDayJS + 6) % 7;
    const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const blank = document.createElement('span');
      blank.className = 'cal-empty';
      blank.setAttribute('aria-hidden', 'true');
      calDaysGrid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(calViewYear, calViewMonth, day);
      cellDate.setHours(0, 0, 0, 0);

      const dayOfWeek = cellDate.getDay(); // 0 = Domingo, 6 = Sábado
      const isSunday = dayOfWeek === 0;
      const isSaturday = dayOfWeek === 6;
      const isPast = cellDate < todayStart;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day';
      btn.textContent = String(day);

      if (isSunday) {
        btn.disabled = true;
        btn.classList.add('cal-day--sunday');
        btn.title = 'Domingos cerrado';
        btn.setAttribute('aria-label', `${formatDateLong(cellDate)} — Cerrado`);
      } else if (isPast) {
        btn.disabled = true;
        btn.setAttribute('aria-label', `${formatDateLong(cellDate)} — Fecha pasada`);
      } else {
        if (isSaturday) {
          btn.classList.add('cal-day--saturday');
          btn.title = 'Sábado: horario extendido 09:00 a 20:00 hs';
        } else {
          btn.title = 'Lunes a Viernes: 09:00 a 16:00 hs';
        }
        btn.setAttribute('aria-label', formatDateLong(cellDate));

        if (
          bookingState.dateObj &&
          bookingState.dateObj.getTime() === cellDate.getTime()
        ) {
          btn.classList.add('is-selected');
        }

        btn.addEventListener('click', () => {
          bookingState.dateObj = cellDate;
          bookingState.timeSlot = '';
          renderTimeSlots();
          goToStep(3);
        });
      }

      calDaysGrid.appendChild(btn);
    }
  };

  calPrevBtn?.addEventListener('click', () => {
    calViewMonth -= 1;
    if (calViewMonth < 0) {
      calViewMonth = 11;
      calViewYear -= 1;
    }
    renderCalendar();
  });

  calNextBtn?.addEventListener('click', () => {
    calViewMonth += 1;
    if (calViewMonth > 11) {
      calViewMonth = 0;
      calViewYear += 1;
    }
    renderCalendar();
  });

  // Paso 3: Horarios dinámicos según día elegido (Lun-Vie vs Sábado)
  const renderTimeSlots = () => {
    if (!bookingState.dateObj || !timeSlotsGrid) return;

    const isSaturday = bookingState.dateObj.getDay() === 6;
    const slots = isSaturday ? SATURDAY_SLOTS : WEEKDAY_SLOTS;

    if (selectedDaySummary) {
      selectedDaySummary.textContent = `Turnos disponibles para el ${formatDateLong(bookingState.dateObj)}.`;
    }

    if (scheduleRulePill) {
      scheduleRulePill.className = isSaturday
        ? 'schedule-rule-pill schedule-rule-pill--sat'
        : 'schedule-rule-pill';
      scheduleRulePill.textContent = isSaturday
        ? '✦ Sábado horario extendido: franjas entre 09:00 y 20:00 hs'
        : '✦ Lunes a Viernes: franjas entre 09:00 y 16:00 hs';
    }

    timeSlotsGrid.innerHTML = '';
    slots.forEach((slot) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot-btn';
      if (bookingState.timeSlot === slot) btn.classList.add('is-selected');
      btn.innerHTML = `<span>${slot} hs</span><small>Disponible</small>`;

      btn.addEventListener('click', () => {
        bookingState.timeSlot = slot;
        renderMiniSummary();
        goToStep(4);
      });

      timeSlotsGrid.appendChild(btn);
    });
  };

  const renderMiniSummary = () => {
    if (!bookingMiniSummary) return;
    bookingMiniSummary.innerHTML = '';
    const items = [
      ['Servicio:', bookingState.service],
      ['Día:', formatDateLong(bookingState.dateObj)],
      ['Horario:', `${bookingState.timeSlot} hs`]
    ];
    items.forEach(([label, value]) => {
      const wrap = document.createElement('span');
      const strong = document.createElement('strong');
      strong.textContent = `${label} `;
      wrap.append(strong, document.createTextNode(value));
      bookingMiniSummary.appendChild(wrap);
    });
  };

  // Paso 4 -> Comprobante Visual + Enlace directo WhatsApp
  if (bookingDetailsForm) {
    bookingDetailsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('booking-name')?.value.trim();
      const phone = document.getElementById('booking-phone')?.value.trim();
      const notes = document.getElementById('booking-notes')?.value.trim();

      if (!fullName) {
        bookingFeedback.textContent = 'Por favor ingresá tu Nombre y Apellido.';
        bookingFeedback.classList.add('is-error');
        document.getElementById('booking-name')?.focus();
        return;
      }

      if (!phone || phone.replace(/\D/g, '').length < 7) {
        bookingFeedback.textContent = 'Ingresá un número de teléfono o WhatsApp válido.';
        bookingFeedback.classList.add('is-error');
        document.getElementById('booking-phone')?.focus();
        return;
      }

      bookingFeedback.textContent = '';
      bookingFeedback.classList.remove('is-error');

      bookingState.fullName = fullName;
      bookingState.phone = phone;
      bookingState.notes = notes || '';

      const code = `MSH-${Math.floor(1000 + Math.random() * 9000)}`;
      const dateLong = formatDateLong(bookingState.dateObj);

      document.getElementById('voucher-code').textContent = code;
      document.getElementById('v-service').textContent = bookingState.service;
      document.getElementById('v-date').textContent = dateLong;
      document.getElementById('v-time').textContent = `${bookingState.timeSlot} hs`;
      document.getElementById('v-name').textContent = bookingState.fullName;
      document.getElementById('v-phone').textContent = bookingState.phone;

      const notesRow = document.getElementById('v-notes-row');
      const notesVal = document.getElementById('v-notes');
      if (bookingState.notes) {
        notesRow.hidden = false;
        notesVal.textContent = bookingState.notes;
      } else {
        notesRow.hidden = true;
      }

      const waLines = [
        'Hola Fátima! Confirmo mi turno agendado desde la web de *Monsheri*:',
        '',
        `• *Código:* ${code}`,
        `• *Servicio:* ${bookingState.service}`,
        `• *Día:* ${dateLong}`,
        `• *Horario:* ${bookingState.timeSlot} hs`,
        `• *Nombre:* ${bookingState.fullName}`,
        `• *Teléfono:* ${bookingState.phone}`
      ];
      if (bookingState.notes) {
        waLines.push(`• *Notas:* ${bookingState.notes}`);
      }
      waLines.push(
        '',
        'Tomo nota de la confirmación de asistencia y la tolerancia de 15 minutos. ¡Nos vemos en el atelier!'
      );

      const voucherWaLink = document.getElementById('voucher-wa-link');
      if (voucherWaLink) {
        voucherWaLink.href = buildWhatsAppUrl(waLines.join('\n'));
      }

      goToStep(5);
    });
  }

  document.getElementById('booking-reset-btn')?.addEventListener('click', () => {
    bookingState.service = '';
    bookingState.dateObj = null;
    bookingState.timeSlot = '';
    bookingDetailsForm?.reset();
    goToStep(1);
  });

  renderCalendar();
})();
