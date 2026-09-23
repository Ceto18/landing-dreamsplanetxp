'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import {
    ArrowRight,
    CheckCircle2,
    CircleStop,
    FileVideo,
    LoaderCircle,
    Star,
    Upload,
    Video,
    X,
} from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'
import {
    missionService,
    type ExperienceOption,
    type MissionOption,
    type MomentOption,
    type OptionsPaginatedResponse,
} from '@/services/missionService'
import { reviewService } from '@/services/reviewService'

type Props = {
    slug?: string
    onSubmitted?: () => Promise<void> | void
}

type UploadStage =
    | 'idle'
    | 'preparing'
    | 'uploading'
    | 'processing'
    | 'success'
    | 'error'

const MAX_RATING = 5
const MAX_VIDEO_SIZE_MB = 200
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024
const OPTIONS_PER_PAGE = 100

async function loadAllOptions<T>(
    fetchPage: (page: number, perPage: number) => Promise<OptionsPaginatedResponse<T>>
): Promise<T[]> {
    const first = await fetchPage(1, OPTIONS_PER_PAGE)
    if (first.last_page <= 1) return first.data

    const pages = await Promise.all(
        Array.from({ length: first.last_page - 1 }, (_, index) =>
            fetchPage(index + 2, OPTIONS_PER_PAGE)
        )
    )

    return [first, ...pages].flatMap((page) => page.data)
}

function formatFileSize(bytes: number) {
    if (bytes <= 0) return '0 B'

    const units = ['B', 'KB', 'MB', 'GB']
    const unitIndex = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        units.length - 1
    )

    const value = bytes / 1024 ** unitIndex

    return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

function getBackendErrorMessage(error: unknown) {
    if (!axios.isAxiosError(error)) return null

    const data = error.response?.data

    if (
        data &&
        typeof data === 'object' &&
        'message' in data &&
        typeof data.message === 'string'
    ) {
        return data.message
    }

    return null
}

export function MomentReviewForm({ slug, onSubmitted }: Props) {
    const videoInputRef = useRef<HTMLInputElement>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)
    const [videoFile, setVideoFile] = useState<File | null>(null)

    const [missionUuid, setMissionUuid] = useState('')
    const [experienceUuid, setExperienceUuid] = useState('')
    const [momentUuid, setMomentUuid] = useState('')

    const [missions, setMissions] = useState<MissionOption[]>([])
    const [experiences, setExperiences] = useState<ExperienceOption[]>([])
    const [moments, setMoments] = useState<MomentOption[]>([])

    const [loadingMissions, setLoadingMissions] = useState(false)
    const [loadingExperiences, setLoadingExperiences] = useState(false)
    const [loadingMoments, setLoadingMoments] = useState(false)

    const [submitting, setSubmitting] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadStage, setUploadStage] = useState<UploadStage>('idle')
    const [formError, setFormError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const videoPreviewUrl = useMemo(
        () => (videoFile ? URL.createObjectURL(videoFile) : null),
        [videoFile]
    )

    useEffect(() => {
        return () => {
            if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl)
        }
    }, [videoPreviewUrl])

    useEffect(() => {
        return () => abortControllerRef.current?.abort()
    }, [])

    useEffect(() => {
        if (slug) return

        let mounted = true

        const loadMissions = async () => {
            try {
                setLoadingMissions(true)
                setFormError(null)

                const data = await loadAllOptions<MissionOption>((page, perPage) =>
                    missionService.getMissionOptions({
                        page,
                        per_page: perPage,
                    })
                )

                if (mounted) setMissions(data)
            } catch (error) {
                console.error('Error cargando misiones:', error)

                if (mounted) {
                    setMissions([])
                    setFormError('No se pudieron cargar las misiones.')
                }
            } finally {
                if (mounted) setLoadingMissions(false)
            }
        }

        void loadMissions()

        return () => {
            mounted = false
        }
    }, [slug])

    useEffect(() => {
        if (slug || !missionUuid) return

        let mounted = true

        const loadExperiences = async () => {
            try {
                setLoadingExperiences(true)
                setFormError(null)

                const data = await loadAllOptions<ExperienceOption>((page, perPage) =>
                    missionService.getExperienceOptions(missionUuid, {
                        page,
                        per_page: perPage,
                    })
                )

                if (mounted) setExperiences(data)
            } catch (error) {
                console.error('Error cargando rutas:', error)

                if (mounted) {
                    setExperiences([])
                    setFormError(
                        'No se pudieron cargar las rutas de esta misión.'
                    )
                }
            } finally {
                if (mounted) setLoadingExperiences(false)
            }
        }

        void loadExperiences()

        return () => {
            mounted = false
        }
    }, [slug, missionUuid])

    useEffect(() => {
        if (slug || !experienceUuid) return

        let mounted = true

        const loadMoments = async () => {
            try {
                setLoadingMoments(true)
                setFormError(null)

                const data = await loadAllOptions<MomentOption>((page, perPage) =>
                    missionService.getMomentOptions(experienceUuid, {
                        page,
                        per_page: perPage,
                    })
                )

                if (mounted) setMoments(data)
            } catch (error) {
                console.error('Error cargando momentos:', error)

                if (mounted) {
                    setMoments([])
                    setFormError(
                        'No se pudieron cargar los momentos de esta ruta.'
                    )
                }
            } finally {
                if (mounted) setLoadingMoments(false)
            }
        }

        void loadMoments()

        return () => {
            mounted = false
        }
    }, [slug, experienceUuid])

    const handleMissionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMissionUuid(event.target.value)
        setExperienceUuid('')
        setMomentUuid('')
        setExperiences([])
        setMoments([])
        setFormError(null)
        setSuccessMessage(null)
    }

    const handleExperienceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setExperienceUuid(event.target.value)
        setMomentUuid('')
        setMoments([])
        setFormError(null)
        setSuccessMessage(null)
    }

    const handleMomentChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMomentUuid(event.target.value)
        setFormError(null)
        setSuccessMessage(null)
    }

    const clearVideo = () => {
        setVideoFile(null)

        if (videoInputRef.current) {
            videoInputRef.current.value = ''
        }
    }

    const resetUploadState = () => {
        setUploadProgress(0)
        setUploadStage('idle')
        abortControllerRef.current = null
    }

    const resetForm = () => {
        setName('')
        setComment('')
        setRating(5)
        setMissionUuid('')
        setExperienceUuid('')
        setMomentUuid('')
        setExperiences([])
        setMoments([])
        clearVideo()
    }

    const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null

        setFormError(null)
        setSuccessMessage(null)
        resetUploadState()

        if (!file) {
            setVideoFile(null)
            return
        }

        if (!file.type.startsWith('video/')) {
            setFormError('El archivo seleccionado debe ser un video.')
            event.target.value = ''
            setVideoFile(null)
            return
        }

        if (file.size > MAX_VIDEO_SIZE_BYTES) {
            setFormError(
                `El video supera el límite de ${MAX_VIDEO_SIZE_MB} MB. El archivo pesa ${formatFileSize(
                    file.size
                )}.`
            )

            event.target.value = ''
            setVideoFile(null)
            return
        }

        setVideoFile(file)
    }

    const cancelUpload = () => {
        abortControllerRef.current?.abort()
        abortControllerRef.current = null
        setSubmitting(false)
        setUploadProgress(0)
        setUploadStage('idle')
        setFormError('La subida del video fue cancelada.')
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (submitting) return

        const cleanName = name.trim()
        const cleanComment = comment.trim()

        setFormError(null)
        setSuccessMessage(null)
        setUploadProgress(0)

        if (!cleanName) {
            setFormError('Ingresa tu nombre.')
            return
        }

        if (!slug && !missionUuid) {
            setFormError('Selecciona una misión.')
            return
        }

        if (!slug && !experienceUuid) {
            setFormError('Selecciona una ruta.')
            return
        }

        if (!slug && !momentUuid) {
            setFormError('Selecciona un momento.')
            return
        }

        if (!cleanComment) {
            setFormError('Ingresa tu comentario.')
            return
        }

        if (rating < 1 || rating > MAX_RATING) {
            setFormError('Selecciona una calificación entre 1 y 5.')
            return
        }

        const controller = new AbortController()
        abortControllerRef.current = controller

        const payload = {
            name: cleanName,
            comment: cleanComment,
            rating,
            video: videoFile,
        }

        const options = {
            signal: controller.signal,
            onUploadProgress: (progress: number) => {
                setUploadProgress(progress)
                setUploadStage(progress >= 100 ? 'processing' : 'uploading')
            },
        }

        try {
            setSubmitting(true)
            setUploadStage('preparing')

            const response = slug
                ? await missionService.createMomentReview(slug, payload, options)
                : await reviewService.createReview(
                      {
                          ...payload,
                          moment_uuid: momentUuid,
                      },
                      options
                  )

            setUploadProgress(100)
            setUploadStage('success')
            resetForm()

            setSuccessMessage(
                response?.message ||
                    'Tu reseña fue enviada y está pendiente de aprobación.'
            )

            await onSubmitted?.()
        } catch (error: unknown) {
            if (axios.isCancel(error) || controller.signal.aborted) return

            console.error(
                slug
                    ? `Error publicando reseña del momento ${slug}:`
                    : 'Error publicando reseña general:',
                error
            )

            setUploadStage('error')
            setFormError(
                getBackendErrorMessage(error) ||
                    'No se pudo enviar tu reseña. Verifica el tamaño del video e inténtalo nuevamente.'
            )
        } finally {
            setSubmitting(false)
            abortControllerRef.current = null
        }
    }

    const uploadStageText = {
        idle: '',
        preparing: 'Preparando los datos...',
        uploading: videoFile
            ? `Subiendo video: ${uploadProgress}%`
            : 'Enviando reseña...',
        processing: 'Procesando...',
        success: 'Reseña enviada correctamente.',
        error: 'Ocurrió un error durante el envío.',
    }[uploadStage]

    return (
        <FadeUp delay={0.1}>
            <AnimatedCard className="rounded-3xl border border-border/60 bg-card/50 p-6 shadow-2xl sm:p-8">
                <div className="mb-6">
                    <h4 className="text-xl font-bold text-foreground">
                        Comparte tu ruta
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Tu reseña será revisada antes de aparecer públicamente.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="reviewName"
                            className="mb-2 block font-semibold text-foreground"
                        >
                            Nombre
                        </label>

                        <input
                            id="reviewName"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            disabled={submitting}
                            placeholder="Escribe tu nombre"
                            required
                            className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>

                    {!slug && (
                        <>
                            <div>
                                <label
                                    htmlFor="reviewMission"
                                    className="mb-2 block font-semibold text-foreground"
                                >
                                    Misión
                                </label>

                                <select
                                    id="reviewMission"
                                    value={missionUuid}
                                    onChange={handleMissionChange}
                                    required
                                    disabled={submitting || loadingMissions}
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">
                                        {loadingMissions
                                            ? 'Cargando misiones...'
                                            : missions.length === 0
                                              ? 'No hay misiones disponibles'
                                              : 'Selecciona una misión'}
                                    </option>

                                    {missions.map((mission) => (
                                        <option
                                            key={mission.uuid}
                                            value={mission.uuid}
                                        >
                                            {mission.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="reviewExperience"
                                    className="mb-2 block font-semibold text-foreground"
                                >
                                    Ruta
                                </label>

                                <select
                                    id="reviewExperience"
                                    value={experienceUuid}
                                    onChange={handleExperienceChange}
                                    required
                                    disabled={
                                        !missionUuid ||
                                        loadingExperiences ||
                                        submitting
                                    }
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">
                                        {loadingExperiences
                                            ? 'Cargando rutas...'
                                            : !missionUuid
                                              ? 'Selecciona una misión'
                                              : experiences.length === 0
                                                ? 'No hay rutas disponibles'
                                                : 'Selecciona una ruta'}
                                    </option>

                                    {experiences.map((experience) => (
                                        <option
                                            key={experience.uuid}
                                            value={experience.uuid}
                                        >
                                            {experience.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="reviewMoment"
                                    className="mb-2 block font-semibold text-foreground"
                                >
                                    Momento
                                </label>

                                <select
                                    id="reviewMoment"
                                    value={momentUuid}
                                    onChange={handleMomentChange}
                                    required
                                    disabled={
                                        !experienceUuid ||
                                        loadingMoments ||
                                        submitting
                                    }
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">
                                        {loadingMoments
                                            ? 'Cargando momentos...'
                                            : !experienceUuid
                                              ? 'Selecciona una ruta'
                                              : moments.length === 0
                                                ? 'No hay momentos disponibles'
                                                : 'Selecciona un momento'}
                                    </option>

                                    {moments.map((moment) => (
                                        <option
                                            key={moment.uuid}
                                            value={moment.uuid}
                                        >
                                            {moment.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <span className="mb-2 block font-semibold text-foreground">
                            Calificación
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                            {Array.from({ length: MAX_RATING }).map(
                                (_, index) => {
                                    const value = index + 1

                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            disabled={submitting}
                                            onClick={() => setRating(value)}
                                            aria-label={`Calificar con ${value} estrellas`}
                                            className="rounded-lg p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <Star
                                                className={`h-7 w-7 transition-colors ${
                                                    value <= rating
                                                        ? 'fill-accent text-accent'
                                                        : 'text-muted-foreground/30 hover:text-accent/60'
                                                }`}
                                            />
                                        </button>
                                    )
                                }
                            )}

                            <span className="ml-2 text-sm font-semibold text-accent">
                                {rating}/5
                            </span>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="reviewComment"
                            className="mb-2 block font-semibold text-foreground"
                        >
                            Comentario
                        </label>

                        <textarea
                            id="reviewComment"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            disabled={submitting}
                            rows={5}
                            placeholder="Cuéntanos cómo fue tu ruta..."
                            required
                            className="w-full resize-none rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <span className="font-semibold text-foreground">
                                Video opcional
                            </span>

                            <span className="text-xs text-muted-foreground">
                                Máximo {MAX_VIDEO_SIZE_MB} MB
                            </span>
                        </div>

                        {!videoFile && (
                            <button
                                type="button"
                                disabled={submitting}
                                onClick={() => videoInputRef.current?.click()}
                                className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-accent/40 bg-accent/[0.03] px-5 py-7 text-center transition hover:border-accent hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                                    <Video className="h-6 w-6 text-accent" />
                                </div>

                                <p className="mt-3 text-sm font-semibold text-foreground">
                                    Selecciona un video
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Durante el envío podrás ver el progreso de la
                                    subida.
                                </p>
                            </button>
                        )}

                        <input
                            ref={videoInputRef}
                            id="videoInput"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            disabled={submitting}
                            className="hidden"
                        />

                        {videoFile && videoPreviewUrl && (
                            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/50">
                                <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                                            <FileVideo className="h-5 w-5 text-accent" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-foreground">
                                                {videoFile.name}
                                            </p>

                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                {formatFileSize(videoFile.size)}
                                            </p>
                                        </div>
                                    </div>

                                    {!submitting && (
                                        <button
                                            type="button"
                                            onClick={clearVideo}
                                            aria-label="Quitar video"
                                            className="rounded-lg p-2 text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>

                                <video
                                    src={videoPreviewUrl}
                                    controls
                                    preload="metadata"
                                    playsInline
                                    className="max-h-72 w-full bg-black object-contain"
                                />
                            </div>
                        )}
                    </div>

                    {submitting && (
                        <div className="overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.05] p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                                        {uploadStage === 'processing' ? (
                                            <LoaderCircle className="h-5 w-5 animate-spin text-accent" />
                                        ) : (
                                            <Upload className="h-5 w-5 text-accent" />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-foreground">
                                            {uploadStageText}
                                        </p>

                                        {videoFile && (
                                            <p className="mt-1 truncate text-xs text-muted-foreground">
                                                {videoFile.name} ·{' '}
                                                {formatFileSize(videoFile.size)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <span className="shrink-0 text-lg font-bold text-accent">
                                    {uploadProgress}%
                                </span>
                            </div>

                            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-border/70">
                                <div
                                    className="h-full rounded-full bg-accent transition-[width] duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <p className="text-xs text-muted-foreground">
                                    No cierres esta página mientras se envía el
                                    archivo.
                                </p>

                                <button
                                    type="button"
                                    onClick={cancelUpload}
                                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500/10"
                                >
                                    <CircleStop className="h-4 w-4" />
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}

                    {formError && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-500">
                            {formError}
                        </div>
                    )}

                    {successMessage && (
                        <div className="flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-3 text-sm text-green-600">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={
                            submitting ||
                            (!slug &&
                                (loadingMissions ||
                                    loadingExperiences ||
                                    loadingMoments))
                        }
                        className="btn-gold inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <LoaderCircle className="h-5 w-5 animate-spin" />

                                {uploadStage === 'processing'
                                    ? 'Procesando reseña...'
                                    : videoFile
                                      ? `Subiendo ${uploadProgress}%`
                                      : 'Enviando reseña...'}
                            </>
                        ) : (
                            <>
                                Publicar reseña
                                <ArrowRight className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>
            </AnimatedCard>
        </FadeUp>
    )
}